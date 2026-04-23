import API from './axiosInstance';
import { mockVacantes, delay } from './mockData';

// Using mock data instead of API calls for development
export const getVacantes = async () => {
  await delay(500); // Simulate network delay
  return {
    data: mockVacantes
  };
};

export const getVacanteById = async (id) => {
  await delay(300);
  const vacante = mockVacantes.find(v => v.id === id);
  return {
    data: vacante || null
  };
};

export const createVacante = (data) => API.post('/vacantes', data);

export const updateVacante = (id, data) => API.put(`/vacantes/${id}`, data);

export const deleteVacante = (id) => API.delete(`/vacantes/${id}`);
