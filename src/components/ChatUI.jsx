import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { ContactCard } from "./ContactCard";
import { MeetingConfirmation } from "./MeetingConfirmation";

export function ChatUI({ messages, isLoading, activeTool, sendMessage, clearActiveTool }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isLoading, activeTool]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const quickQuestions = [
    "¿Quién es Carlos?",
    "¿Qué proyectos tiene?",
    "Información de contacto",
    "Agendar una reunión",
  ];

  return (
    <div className="flex flex-col h-[600px] bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-b border-slate-700/50">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm">
            Asistente de Carlos
          </h3>
          <p className="text-emerald-400 text-xs">En línea</p>
        </div>
      </div>

      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-5 space-y-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        <AnimatePresence>
          {activeTool?.name === "get_contact_info" && (
            <ContactCard onClose={clearActiveTool} />
          )}
          {activeTool?.name === "schedule_meeting_mock" && (
            <MeetingConfirmation
              args={activeTool.args}
              onClose={clearActiveTool}
            />
          )}
        </AnimatePresence>

        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 1 && (
        <div className="px-5 pb-3">
          <p className="text-xs text-slate-500 mb-2">Preguntas frecuentes:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question) => (
              <button
                key={question}
                onClick={() => sendMessage(question)}
                className="px-3 py-1.5 text-xs bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-full border border-slate-700/50 hover:border-blue-500/50 transition-all duration-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="p-4 bg-slate-800/50 border-t border-slate-700/50"
      >
        <div className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 disabled:opacity-50 transition-all text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
