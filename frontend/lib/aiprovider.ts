import { api } from './api';

/* ================= CREATE ================= */
export async function createAiProvider(data: any) {
  const res = await api.post('/ai-providers', data);
  return res.data;
}

/* ================= GET ALL ================= */
export async function getAiProviders() {
  const res = await api.get('/ai-providers');
  return res.data;
}

/* ================= ACTIVE ================= */
export async function getActiveAiProviders() {
  const res = await api.get('/ai-providers/active');
  return res.data;
}

/* ================= UPDATE ================= */
export async function updateAiProvider(id: string, data: any) {
  const res = await api.patch(`/ai-providers/${id}`, data);
  return res.data;
}

/* ================= DELETE ================= */
export async function deleteAiProvider(id: string) {
  const res = await api.delete(`/ai-providers/${id}`);
  return res.data;
}