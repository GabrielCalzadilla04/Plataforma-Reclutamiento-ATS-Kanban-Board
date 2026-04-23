import API from './axiosInstance';
import { mockPostulaciones, delay } from './mockData';

export const getPostulaciones = async () => {
  await delay(500); // Simulate network delay
  return {
    data: mockPostulaciones
  };
};

export const getPostulacionesByVacante = (vacanteId) =>
  API.get(`/postulaciones/vacante/${vacanteId}`);

export const createPostulacion = async (formData) => {
  await delay(800); // Simulate network delay
  const newPostulacion = {
    id: mockPostulaciones.length + 1,
    vacanteId: formData.vacanteId,
    usuarioId: "user" + (mockPostulaciones.length + 1),
    nombre: formData.nombre || "Candidato",
    email: formData.email || "candidato@example.com",
    fechaPostulacion: new Date().toISOString().split('T')[0],
    estado: "En revisión"
  };
  mockPostulaciones.push(newPostulacion);
  return {
    data: newPostulacion
  };
};

export const updateEstado = (id, estado) =>
  API.patch(`/postulaciones/${id}/estado`, { estado });

export const updateNotas = (id, notas) =>
  API.patch(`/postulaciones/${id}/notas`, { notas });

export const getCvUrl = (id) => `/api/postulaciones/${id}/cv`;

export const fetchCvBlob = (id) =>
  API.get(`/postulaciones/${id}/cv`, { responseType: 'blob' });

export const deletePostulacion = (id) => API.delete(`/postulaciones/${id}`);
