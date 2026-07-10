import { useChat } from "../hooks/useChat";
import { ChatUI } from "./ChatUI";

export function AgentSection() {
  const { messages, isLoading, activeTool, sendMessage, clearActiveTool, resetChat } =
    useChat();

  return (
    <section
      id="ai-agent"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
      data-aos="fade-up"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-400 text-sm font-medium">
              Powered by Gemini AI
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Intelligent Virtual{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Assistant
            </span>
          </h2>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-2">
            Ask my AI assistant about my experience, projects, or contact
            information. It uses Gemini with Tool Calling to provide precise
            answers and real-time information.
          </p>

          <button
            onClick={resetChat}
            className="text-slate-500 hover:text-slate-300 text-sm underline underline-offset-4 transition-colors"
          >
            Reset conversation
          </button>
        </div>

        <ChatUI
          messages={messages}
          isLoading={isLoading}
          activeTool={activeTool}
          sendMessage={sendMessage}
          clearActiveTool={clearActiveTool}
        />

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Protected data</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>Real-time responses</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4"
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
            <span>Tool Calling with Gemini</span>
          </div>
        </div>
      </div>
    </section>
  );
}
