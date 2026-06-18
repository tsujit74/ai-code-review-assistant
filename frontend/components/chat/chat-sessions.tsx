"use client";

type Session = {
  id: string;
  title?: string;
  createdAt?: string;
};

type Props = {
  sessions: Session[];
  selectedSessionId?: string;
  onSelect: (session: Session) => void;
  onCreate: () => void;
};

export function ChatSessions({
  sessions,
  selectedSessionId,
  onSelect,
  onCreate,
}: Props) {
  const formatDate = (date?: string) => {
    if (!date) return "Recently";

    try {
      return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
      }).format(new Date(date));
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="h-full flex flex-col bg-zinc-950">
      {/* Header */}
      <div className="px-4 py-4 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">
              AI Conversations
            </h3>

            <p className="text-xs text-zinc-400 mt-1">
              Project-aware chat sessions
            </p>
          </div>

          <button
            onClick={onCreate}
            className="
              h-8 px-3
              border border-zinc-700
              bg-zinc-900
              text-zinc-200
              text-xs font-medium
              hover:bg-zinc-800
              hover:border-zinc-600
              transition-all
            "
          >
            + New
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-3 py-2 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-zinc-400">
            Sessions
          </span>

          <span
            className="
              px-2 py-1
              text-[10px]
              border border-zinc-700
              bg-zinc-900
              text-zinc-300
            "
          >
            {sessions.length}
          </span>
        </div>
      </div>

      {/* Sessions */}
      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center px-6 text-center">
            <div className="text-3xl mb-3">💬</div>

            <h4 className="text-sm font-medium text-zinc-300">
              No Sessions Yet
            </h4>

            <p className="text-xs text-zinc-400 mt-2 max-w-[220px]">
              Create your first AI conversation to start discussing your
              codebase.
            </p>

            <button
              onClick={onCreate}
              className="
                mt-4
                px-4 py-2
                border border-zinc-700
                bg-zinc-900
                text-zinc-200
                text-xs
                hover:bg-zinc-800
                transition
              "
            >
              Create Session
            </button>
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {sessions.map((session, index) => {
              const active = selectedSessionId === session.id;

              return (
                <button
                  key={session.id}
                  onClick={() => onSelect(session)}
                  className={`
                    w-full text-left
                    border
                    p-3
                    transition-all

                    ${
                      active
                        ? `
                          border-zinc-500
                          bg-zinc-900
                          shadow-lg shadow-black/30
                        `
                        : `
                          border-zinc-800
                          bg-zinc-950
                          hover:bg-zinc-900
                          hover:border-zinc-700
                        `
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-2 cursor-pointer">
                    <div className="min-w-0">
                      <p
                        className={`
                          text-sm font-medium truncate

                          ${
                            active
                              ? "text-zinc-100"
                              : "text-zinc-300"
                          }
                        `}
                      >
                        {session.title || `Conversation ${index + 1}`}
                      </p>

                      <p className="text-[11px] text-zinc-300 mt-1">
                        {formatDate(session.createdAt)}
                      </p>
                    </div>

                    {active && (
                      <div
                        className="
                          h-2 w-2
                          rounded-full
                          bg-green-100
                          mt-1
                          animate-pulse
                        "
                      />
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
                      AI Session
                    </span>

                    <span className="text-zinc-200 text-xs">
                      →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}