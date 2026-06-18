import { api } from './api';


export async function createChatSession(projectId: string) {
  const res = await api.post('/chat/session', {
    projectId,
  });

  return res.data;
}

export async function fetchChatSessions(projectId: string) {
  const res = await api.get(`/chat/session/${projectId}`);
  return res.data;
}


export async function fetchChatMessages(sessionId: string) {
  const res = await api.get(`/chat/${sessionId}/messages`);
  return res.data;
}


export async function sendChatMessage(
  sessionId: string,
  message: string,
  providerId?: string
) {
  const res = await api.post('/chat/message', {
    sessionId,
    message,
    providerId,
  });

  return res.data;
}