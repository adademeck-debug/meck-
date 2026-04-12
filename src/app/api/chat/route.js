"use server";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { message } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Save user message
    await supabase.from("messages").insert([
      { role: "user", content: message },
    ]);

    let reply = "";

    try {
      // ✅ Try OpenAI
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

      reply = ai.choices[0].message.content;

    } catch (err) {
      console.error("OpenAI Error:", err.message);

      // ✅ Fallback if OpenAI fails
      reply =
        "Thanks for your message! Please contact us on WhatsApp for a quick quote.";
    }

    // Save AI reply
    await supabase.from("messages").insert([
      { role: "ai", content: reply },
    ]);

    return Response.json({
      success: true,
      reply,
    });

  } catch (err) {
    console.error("Server Error:", err.message);

    return Response.json(
      {
        success: false,
        reply:
          "Something went wrong. Please contact us on WhatsApp for assistance.",
      },
      { status: 500 }
    );
  }
}