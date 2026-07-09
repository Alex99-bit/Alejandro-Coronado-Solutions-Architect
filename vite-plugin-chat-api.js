import { GoogleGenerativeAI } from "@google/generative-ai";
import { loadEnv } from "vite";
import { CHAT_TOOLS, getSystemPrompt } from "./src/data/chatConfig.js";

export function chatApiPlugin(mode) {
  return {
    name: "chat-api",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        try {
          let body = "";
          for await (const chunk of req) {
            body += chunk;
          }
          const { messages } = JSON.parse(body);

          const env = loadEnv(mode, process.cwd(), "");
          const apiKey = env.GEMINI_API_KEY;
          if (!apiKey) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "API key not configured" }));
            return;
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
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "No response from model" }));
            return;
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

          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              content: textContent,
              toolCalls: toolCalls,
            })
          );
        } catch (error) {
          console.error("Chat API error:", error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error: "Internal server error",
              details: error.message,
            })
          );
        }
      });
    },
  };
}
