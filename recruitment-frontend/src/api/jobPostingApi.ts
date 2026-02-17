import apiClient from './axiosClient';
import type { JobPosting, CreateJobPostingRequest, UpdateJobPostingRequest } from '../types/jobPosting';

export const jobPostingApi = {
  getPublished: () =>
    apiClient.get<JobPosting[]>('/jobpostings/published').then((r) => r.data),
  getById: (id: string) =>
    apiClient.get<JobPosting>(`/jobpostings/${id}`).then((r) => r.data),
  getAll: () =>
    apiClient.get<JobPosting[]>('/jobpostings').then((r) => r.data),
  create: (data: CreateJobPostingRequest) =>
    apiClient.post<JobPosting>('/jobpostings', data).then((r) => r.data),
  update: (id: string, data: UpdateJobPostingRequest) =>
    apiClient.put<JobPosting>(`/jobpostings/${id}`, data).then((r) => r.data),
  publish: (id: string) =>
    apiClient.patch<JobPosting>(`/jobpostings/${id}/publish`).then((r) => r.data),
  delete: (id: string) =>
    apiClient.delete(`/jobpostings/${id}`),
};