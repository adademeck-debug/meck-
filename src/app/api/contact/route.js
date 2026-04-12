import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req) {
  try {
    const body = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const resend = new Resend(process.env.RESEND_API_KEY);

    const payload = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      service: body.service,
      message: body.message,
      size: body.size,
      bedrooms: body.bedrooms,
      bathrooms: body.bathrooms,
      extras: body.extras,
      price: body.price,
    };

    // ✅ SAVE TO DATABASE
    const { error } = await supabase
      .from("Contacts")
      .insert([payload]);

    if (error) {
      console.error("Supabase error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    // =========================
    // ✅ EMAIL 1: ADMIN (YOU)
    // =========================
    await resend.emails.send({
      from: "Green Line <onboarding@resend.dev>",
      to: "info@greenlinefaciliities.co.uk",
      subject: "🚨 New Cleaning Booking",
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Phone:</strong> ${payload.phone}</p>
        <p><strong>Service:</strong> ${payload.service}</p>
        <p><strong>Address:</strong> ${payload.address}</p>
        <p><strong>Message:</strong> ${payload.message}</p>
        <p><strong>Estimated Price:</strong> £${payload.price}</p>
      `,
    });

    // =========================
    // ✅ EMAIL 2: CLIENT (NEW 🔥)
    // =========================
    await resend.emails.send({
      from: "Green Line Facilities <onboarding@resend.dev>",
      to: payload.email,
      subject: "✅ Your Quote Request Received",
      html: `
        <div style="font-family: Arial; padding:20px;">
          <h2 style="color:#16a34a;">Thank You, ${payload.name}!</h2>

          <p>We’ve received your request for <strong>${payload.service}</strong>.</p>

          <p>Our team is reviewing your request and will contact you shortly.</p>

          <div style="margin:20px 0; padding:15px; background:#f0fdf4; border-radius:10px;">
            <p><strong>Estimated Price:</strong> £${payload.price}</p>
            <p><strong>Service:</strong> ${payload.service}</p>
          </div>

          <p>If your request is urgent, you can contact us directly:</p>

          <a href="https://wa.me/447344294706"
             style="display:inline-block; margin-top:10px; padding:12px 20px; background:#16a34a; color:white; text-decoration:none; border-radius:6px;">
             Chat on WhatsApp
          </a>

          <br/><br/>

          <p style="color:gray;">Green Line Facilities Limited</p>
        </div>
      `,
    });

    return Response.json({ success: true });

  } catch (err) {
    console.error("Server error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}