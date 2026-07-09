import { useState, useCallback, useRef } from "react";

const INITIAL_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content:
    "¡Hola! Soy el asistente virtual de Carlos Alejandro Coronado. Puedo ayudarte a conocer su experiencia en desarrollo de videojuegos, Realidad Extendida (XR) y automatización con IA. ¿En qué puedo ayudarte hoy?",
  timestamp: new Date(),
};

export function useChat() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTool, setActiveTool] = useState(null);
  const abortControllerRef = useRef(null);

  const sendMessage = useCallback(
    async (content) => {
      if (!content.trim() || isLoading) return;

      const userMessage = {
        id: Date.now().toString(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsLoading(true);
      setActiveTool(null);

      try {
        abortControllerRef.current = new AbortController();

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("API Error:", errorData);
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.toolCalls && data.toolCalls.length > 0) {
          for (const toolCall of data.toolCalls) {
            setActiveTool({
              name: toolCall.name,
              args: toolCall.args,
            });
          }
        }

        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            data.content ||
            "Aquí tienes la información solicitada:",
          timestamp: new Date(),
          toolCalls: data.toolCalls || [],
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error("Chat error:", error);
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.",
          timestamp: new Date(),
          isError: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [messages, isLoading]
  );

  const clearActiveTool = useCallback(() => {
    setActiveTool(null);
  }, []);

  const resetChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    setActiveTool(null);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    messages,
    isLoading,
    activeTool,
    sendMessage,
    clearActiveTool,
    resetChat,
  };
}
