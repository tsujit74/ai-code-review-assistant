"use client";

import { useEffect, useRef, useState } from "react";

import {
  createChatSession,
  fetchChatMessages,
  fetchChatSessions,
  sendChatMessage,
} from "@/lib/chat";

import { ChatSessions } from "./chat-sessions";

type RoleMeta = {
  label: string;
  badge: string;
};

const getRoleMeta = (role: string): RoleMeta => {
  switch (role) {
    case "user":
      return {
        label: "You",
        badge: "border-blue-500/30 bg-blue-500/10 text-blue-400",
      };

    case "assistant":
      return {
        label: "AI",
        badge: "border-zinc-700 bg-zinc-900 text-zinc-300",
      };

    case "system":
      return {
        label: "System",
        badge: "border-zinc-700 bg-zinc-900 text-zinc-500",
      };

    default:
      return {
        label: role,
        badge: "border-zinc-700 bg-zinc-900 text-zinc-400",
      };
  }
};

export function ChatPanel({
  projectId,
  provider,
}: {
  projectId: string;
  provider: any;
}) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const loadSessions = async () => {
    const data = await fetchChatSessions(projectId);

    setSessions(data);

    if (!selectedSession && data.length > 0) {
      setSelectedSession(data[0]);
    }
  };

  const loadMessages = async (sessionId: string) => {
    setLoadingMessages(true);

    try {
      const data = await fetchChatMessages(sessionId);

      setMessages(data);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, [projectId]);

  useEffect(() => {
    if (selectedSession) {
      loadMessages(selectedSession.id);
    }
  }, [selectedSession]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleCreateSession = async () => {
    const session = await createChatSession(projectId);

    await loadSessions();

    setSelectedSession(session);
  };

  const handleSend = async () => {
    if (!input.trim() || !selectedSession || loading) return;

    const text = input;

    setInput("");
    setLoading(true);

    try {
      await sendChatMessage(selectedSession.id, text, provider?.id);

      await loadMessages(selectedSession.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        h-full
        border border-zinc-400
        bg-zinc-900/40
        overflow-hidden
        flex
      "
    >
      {/* LEFT */}
      <div
        className="
          w-[320px]
          border-r border-zinc-400
          flex-shrink-0
        "
      >
        <ChatSessions
          sessions={sessions}
          selectedSessionId={selectedSession?.id}
          onSelect={setSelectedSession}
          onCreate={handleCreateSession}
        />
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <div
          className="
            px-4 py-3
            border-b border-zinc-400
            flex items-center justify-between
          "
        >
          <div>
            <h2
              className="
                text-sm
                font-medium
                text-zinc-300
              "
            >
              AI Code Assistant
            </h2>

            <p
              className="
                text-xs
                text-zinc-400
                mt-1
              "
            >
              Context-aware project intelligence
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Provider:</span>

            <span className="px-2 py-1 border border-zinc-700 bg-zinc-950 text-xs text-zinc-200">
              {provider?.name || "None"}
            </span>
          </div>

          {selectedSession && (
            <div
              className="
                px-3 py-1
                border border-zinc-700
                bg-zinc-950
                text-[11px]
                text-green-300
                animate-pulse
              "
            >
              Active Session
            </div>
          )}
        </div>

        {/* NO SESSION */}
        {!selectedSession ? (
          <div
            className="
              flex-1
              flex flex-col
              items-center
              justify-center
              text-center
              px-8
            "
          >
            <div className="text-5xl mb-4">🤖</div>

            <h3
              className="
                text-lg
                font-medium
                text-zinc-200
              "
            >
              Start an AI Conversation
            </h3>

            <p
              className="
                mt-2
                text-sm
                text-zinc-400
                max-w-md
              "
            >
              Create a session and ask questions about architecture, bugs,
              security, performance, or your uploaded codebase.
            </p>

            <button
              onClick={handleCreateSession}
              className="
                mt-5
                px-4 py-2
                border border-zinc-700
                bg-zinc-900
                text-zinc-200
                text-sm
                hover:bg-zinc-800
                transition
              "
            >
              Create Session
            </button>
          </div>
        ) : (
          <>
            {/* MESSAGES */}
            <div
              className="
                flex-1
                overflow-y-auto
                p-5
                space-y-5
              "
            >
              {loadingMessages ? (
                <div
                  className="
                    h-full
                    flex items-center
                    justify-center
                    text-zinc-400
                    text-sm
                  "
                >
                  Loading conversation...
                </div>
              ) : messages.length === 0 ? (
                <div
                  className="
                    h-full
                    flex flex-col
                    items-center
                    justify-center
                    text-center
                  "
                >
                  <div className="text-4xl mb-3">💬</div>

                  <h3 className="text-zinc-300">New Conversation</h3>

                  <p
                    className="
                      text-sm
                      text-zinc-500
                      mt-2
                    "
                  >
                    Ask AI anything about your project.
                  </p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isUser = msg.role === "user";

                  const meta = getRoleMeta(msg.role);

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`
                          max-w-[80%]
                          border
                          px-3 py-3
                          transition-all

                          ${
                            isUser
                              ? `
                                border-blue-500/20
                                bg-blue-600
                                text-white
                              `
                              : `
                                border-zinc-800
                                bg-zinc-950
                                text-zinc-200
                              `
                          }
                        `}
                      >
                        <div
                          className="
                            flex items-center gap-2
                            mb-2
                          "
                        >
                          <span
                            className={`
                              px-2 py-0.5
                              text-[10px]
                              border
                              ${meta.badge}
                            `}
                          >
                            {meta.label}
                          </span>
                        </div>

                        <div
                          className="
                            whitespace-pre-wrap
                            text-sm
                            leading-relaxed
                          "
                        >
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div
              className="
                border-t border-zinc-400
                p-4
              "
            >
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask about architecture, security, bugs, performance..."
                  className="
                    flex-1
                    h-11
                    px-4
                    border border-zinc-400
                    bg-zinc-950
                    text-zinc-200
                    text-sm
                    outline-none
                    focus:border-zinc-500
                  "
                />

                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="
                    h-11
                    px-5
                    border border-zinc-500
                    bg-zinc-100
                    text-zinc-900
                    text-sm font-medium
                    hover:bg-white
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    transition
                  "
                >
                  {loading ? "Thinking..." : "Send"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
