import { api } from './api';

export async function fetchProjects() {
  const res = await api.get('/projects');
  return res.data;
}

export async function createProject(name: string) {
  const res = await api.post('/projects', { name });
  return res.data;
}

export async function deleteProject(id: string) {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
}