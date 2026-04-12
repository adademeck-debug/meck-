import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Save USER message
    await supabase.from("messages").insert([
      { role: "user", content: message },
    ]);

    // AI RESPONSE
    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a professional assistant for Green Line Facilities.
Be friendly, short, and helpful.
Encourage users to request a quote or contact via WhatsApp.
          `,
        },
        { role: "user", content: message },
      ],
    });

    const reply = ai.choices[0].message.content;

    // Save AI message
    await supabase.from("messages").insert([
      { role: "ai", content: reply },
    ]);

    return Response.json({ success: true });

  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}