import { api } from './api';

export async function uploadProjectZip(projectId: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await api.post(`/files/upload/${projectId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function fetchFileTree(projectId: string) {
  const res = await api.get(`/files/tree/${projectId}`);
  return res.data;
}

export async function fetchFileById(projectId: string, fileId: string) {
  const res = await api.get(`/files/${projectId}/${fileId}`);
  return res.data;
}