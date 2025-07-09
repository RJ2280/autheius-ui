import { create } from 'zustand';
import apiClient from '../api';

export const useGenerationStore = create((set, get) => ({
  jobs: [],
  latestCritique: null,
  setJobs: (jobs) => set({ jobs }),
  addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),
  updateJob: (jobId, updates) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === jobId ? { ...job, ...updates } : job
      ),
    })),
  startGeneration: async (prompt, model) => {
    try {
      const { data } = await apiClient.post('/generate', { prompt, model });
      set({ latestCritique: data.critique });

      if (data.promptApproved) {
        const newJob = {
          id: data.jobId,
          prompt,
          model,
          status: 'processing',
          createdAt: new Date().toISOString(),
          resultUrl: null,
        };
        get().addJob(newJob);
        return newJob;
      }
      return null; // No job was created
    } catch (error) {
      console.error('Failed to start generation job:', error);
      return null;
    }
  },
  fetchJobs: async () => {
    try {
      const { data } = await apiClient.get('/generate');
      get().setJobs(data);
    } catch (error) {
      console.error('Failed to fetch generation jobs:', error);
    }
  },
}));
