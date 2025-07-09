import { create } from 'zustand';
import apiClient from '../api';

export const useLessonStore = create((set, get) => ({
  currentLesson: null,
  isLoadingLesson: true,
  error: null,
  summary: '',
  isLoadingSummary: false,
  clearLesson: () => set({
    currentLesson: null,
    isLoadingLesson: true,
    error: null,
    summary: '',
    isLoadingSummary: false
  }),
  fetchLesson: async (lessonId) => {
    set({ isLoadingLesson: true, error: null });
    try {
      const { data } = await apiClient.get(`/lessons/${lessonId}`);
      set({ currentLesson: data, isLoadingLesson: false });
    } catch (error) {
      console.error(`Failed to fetch lesson ${lessonId}:`, error);
      set({ error: 'Failed to load the lesson. Please try again.', isLoadingLesson: false });
    }
  },
  fetchSummary: async (lessonContent) => {
    set({ isLoadingSummary: true, summary: '' });
    try {
      const { data } = await apiClient.post('/autheius/ask', {
        task: 'summarize_lesson',
        context: { text: lessonContent },
      });
      set({ summary: data.text, isLoadingSummary: false });
    } catch (error) {
      console.error('Failed to fetch summary:', error);
      set({ error: 'Failed to generate summary.', isLoadingSummary: false });
    }
  },
}));
