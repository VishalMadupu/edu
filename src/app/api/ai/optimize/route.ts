import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { prompt, context } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemInstruction = `
      You are an AI assistant for ServiceLink, a platform connecting clients with professionals.
      Your task is to help the user optimize their project description or service offer.
      Make it professional, clear, and compelling.
      Keep the tone helpful and professional.
      Format the output as a clean project description.
    `;

    const fullPrompt = `
      System: ${systemInstruction}
      User is asking for: ${prompt}
      Current Context: ${context}
    `;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ result: text });
  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate AI response" },
      { status: 500 }
    );
  }
}
