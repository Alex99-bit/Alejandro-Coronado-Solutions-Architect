import { GoogleGenerativeAI } from "@google/generative-ai";
import { CHAT_TOOLS, getSystemPrompt } from "../src/data/chatConfig.js";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      tools: CHAT_TOOLS,
      systemInstruction: getSystemPrompt(),
    });

    const chatHistory = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const firstUserIdx = chatHistory.findIndex((m) => m.role === "user");
    const validHistory = firstUserIdx >= 0 ? chatHistory.slice(firstUserIdx) : [];

    const chat = model.startChat({
      history: validHistory,
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response;

    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      return new Response(
        JSON.stringify({ error: "No response from model" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const candidate = candidates[0];
    const parts = candidate.content.parts;

    let textContent = "";
    let toolCalls = [];

    for (const part of parts) {
      if (part.text) {
        textContent += part.text;
      }
      if (part.functionCall) {
        toolCalls.push({
          name: part.functionCall.name,
          args: part.functionCall.args || {},
        });
      }
    }

    return new Response(
      JSON.stringify({
        content: textContent,
        toolCalls: toolCalls,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
