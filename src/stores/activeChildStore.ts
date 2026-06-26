import { create } from 'zustand';
import type { Child } from '../types';

interface ActiveChildState {
  activeChild: Child | null;
  setActiveChild: (child: Child | null) => void;
}

export const useActiveChildStore = create<ActiveChildState>((set) => ({
  activeChild: null,
  setActiveChild: (activeChild) => set({ activeChild }),
}));
