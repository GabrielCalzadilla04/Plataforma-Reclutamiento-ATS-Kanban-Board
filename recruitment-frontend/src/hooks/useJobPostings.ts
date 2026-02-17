import { useState, useEffect, useCallback } from 'react';
import { jobPostingApi } from '../api/jobPostingApi';
import type { JobPosting, CreateJobPostingRequest } from '../types/jobPosting';

export function useJobPostings(mode: 'published' | 'all' = 'published') {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = mode === 'published'
        ? await jobPostingApi.getPublished()
        : await jobPostingApi.getAll();
      setJobs(data);
    } catch {
      setError('Error al cargar las vacantes');
    } finally {
      setLoading(false);
    }
  }, [mode]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const createJob = async (data: CreateJobPostingRequest) => {
    const newJob = await jobPostingApi.create(data);
    setJobs((prev) => [newJob, ...prev]);
    return newJob;
  };

  const publishJob = async (id: string) => {
    const updated = await jobPostingApi.publish(id);
    setJobs((prev) => prev.map((j) => (j.id === id ? updated : j)));
    return updated;
  };

  const deleteJob = async (id: string) => {
    await jobPostingApi.delete(id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  return { jobs, loading, error, refetch: fetchJobs, createJob, publishJob, deleteJob };
}