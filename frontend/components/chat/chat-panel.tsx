'use client';

import { useEffect, useState } from 'react';
import { createChatSession, fetchChatMessages, fetchChatSessions, sendChatMessage } from '@/lib/chat';

export function ChatPanel({ projectId }: { projectId: string }) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const loadSessions = async () => {
    const data = await fetchChatSessions(projectId);
    setSessions(data);
    if (data.length > 0 && !selectedSession) {
      setSelectedSession(data[0]);
    }
  };

  const loadMessages = async (sessionId: string) => {
    const data = await fetchChatMessages(sessionId);
    setMessages(data);
  };

  useEffect(() => {
    loadSessions();
  }, [projectId]);

  useEffect(() => {
    if (selectedSession) {
      loadMessages(selectedSession.id);
    }
  }, [selectedSession]);

  const handleCreateSession = async () => {
    const session = await createChatSession(projectId);
    setSelectedSession(session);
    await loadSessions();
  };

  const handleSend = async () => {
    if (!input.trim() || !selectedSession) return;
    setLoading(true);
    try {
      await sendChatMessage(selectedSession.id, input);
      setInput('');
      await loadMessages(selectedSession.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 rounded border p-4">
      <div className="flex gap-2">
        <button className="rounded border px-3 py-2" onClick={handleCreateSession}>
          New Chat Session
        </button>
        <select
          className="rounded border px-3 py-2"
          value={selectedSession?.id || ''}
          onChange={(e) => {
            const session = sessions.find((s) => s.id === e.target.value);
            setSelectedSession(session || null);
          }}
        >
          {sessions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.id}
            </option>
          ))}
        </select>
      </div>

      <div className="h-80 overflow-auto rounded border p-3 space-y-2 bg-muted/20">
        {messages.map((msg) => (
          <div key={msg.id} className="rounded border p-2">
            <div className="text-xs uppercase text-muted-foreground">{msg.role}</div>
            <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 rounded border px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the code..."
        />
        <button
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          disabled={loading}
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}