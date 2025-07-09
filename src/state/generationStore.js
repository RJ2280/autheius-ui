import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const useGenerationStore = create((set, get) => ({
  jobs: [],
  addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),
  updateJob: (jobId, updates) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === jobId ? { ...job, ...updates } : job
      ),
    })),
  startGeneration: async (prompt, model) => {
    try {
      const { data } = await axios.post(`${API_URL}/generate`, { prompt, model });
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
    } catch (error) {
      console.error('Failed to start generation job:', error);
      // You could add an error state to the job here
      return null;
    }
  },
}));
