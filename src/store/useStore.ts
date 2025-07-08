import { create } from 'zustand'

interface State {
  message: string
  setMessage: (msg: string) => void
}

const useStore = create<State>((set) => ({
  message: 'Loading...',
  setMessage: (msg) => set({ message: msg }),
}))

export default useStore
