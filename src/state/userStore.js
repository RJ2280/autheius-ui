import { create } from 'zustand';

// This is a placeholder for a real authentication system.
// In a real app, you would have actions like login, logout, fetchUser, etc.
const mockUser = {
  id: 'robbie',
  name: 'Robbie',
  email: 'robbie@autheius.ai',
};

export const useUserStore = create((set) => ({
  // The current authenticated user, or null if not logged in.
  user: mockUser,
  // Example of an action to update the user (e.g., after login)
  setUser: (newUser) => set({ user: newUser }),
  // Example of a logout action
  logout: () => set({ user: null }),
}));