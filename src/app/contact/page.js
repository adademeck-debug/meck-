"use client";
import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      service,
      message,
      size,
      bedrooms,
      bathrooms,
      extras,
      price,
    } = body;

    // ✅ Validation (matches your frontend)
    if (!firstName || !lastName) {
      return Response.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@")) {
      return Response.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    if (!phone) {
      return Response.json(
        { error: "Phone required" },
        { status: 400 }
      );
    }

    if (!service) {
      return Response.json(
        { error: "Service required" },
        { status: 400 }
      );
    }

    // ✅ Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // ✅ Save EVERYTHING (important)
    const { error } = await supabase.from("contacts").insert([
      {
        name: `${firstName} ${lastName}`,
        email,
        phone,
        address,
        service,
        message,
        size,
        bedrooms,
        bathrooms,
        extras,
        price,
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return Response.json(
        { error: "Database error" },
        { status: 500 }
      );
    }

    // ✅ SUCCESS
    return Response.json({ success: true });

  } catch (err) {
    console.error("API crash:", err);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
