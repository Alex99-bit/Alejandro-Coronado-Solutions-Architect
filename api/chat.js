import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  runtime: "edge",
};

const SYSTEM_PROMPT = `Actúas como el Asistente Virtual y Project Manager de Carlos Alejandro Coronado Obregón. Carlos es un experimentado Dev Lead, Solutions Architect y Technical Sales Manager con profunda experiencia en el desarrollo de videojuegos, tecnologías de Realidad Extendida (XR) y automatización con IA.

Actualmente lidera proyectos de alto impacto que debes conocer a la perfección para responder preguntas de reclutadores o clientes:
1. **LPAV:** Una plataforma SaaS full-stack diseñada para agencias de viajes, facilitando la conexión entre viajeros y agencias verificadas.
2. **DishQ:** Un ERP en la nube diseñado para la gestión integral de restaurantes, abarcando control de inventario, flujo de caja y gestión de roles de usuario.
3. **AIA (Artificial Intelligence Agency):** Su startup especializada en el diseño, desarrollo y despliegue de agentes de IA y automatizaciones complejas para optimizar operaciones de negocios.

Tu tono debe ser profesional, técnicamente preciso, ingenioso y orientado a negocios. Responde de forma concisa, destacando cómo la experiencia de Carlos resuelve problemas reales de arquitectura y desarrollo. Si no conoces un dato específico, ofrece canalizar la duda directamente con él usando tus herramientas.

Responde siempre en español a menos que el usuario te escriba en otro idioma.`;

const tools = [
  {
    functionDeclarations: [
      {
        name: "get_contact_info",
        description:
          "Retorna la información de contacto profesional de Carlos Alejandro Coronado Obregón. Usa esta herramienta cuando el usuario pregunte por formas de contacto, LinkedIn, correo electrónico o cómo comunicarse con Carlos.",
        parameters: {
          type: "OBJECT",
          properties: {},
          required: [],
        },
      },
      {
        name: "schedule_meeting_mock",
        description:
          "Simula el agendamiento de una reunión o llamada con Carlos. Usa esta herramienta cuando el usuario desee agendar una reunión. Debes solicitar primero la fecha y hora preferida.",
        parameters: {
          type: "OBJECT",
          properties: {
            date: {
              type: "STRING",
              description: "Fecha preferida para la reunión en formato YYYY-MM-DD",
            },
            time: {
              type: "STRING",
              description: "Hora preferida para la reunión en formato HH:MM (24h)",
            },
            topic: {
              type: "STRING",
              description: "Tema o motivo de la reunión",
            },
          },
          required: ["date", "time"],
        },
      },
    ],
  },
];

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
      tools,
      systemInstruction: SYSTEM_PROMPT,
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
