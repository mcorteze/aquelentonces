import { create } from 'zustand';
import type { PaletteId } from '../types';

interface PaletteState {
  paletteId: PaletteId;
  setPalette: (id: PaletteId) => void;
}

export const usePaletteStore = create<PaletteState>((set) => ({
  paletteId: 'aurora',
  setPalette: (paletteId) => {
    document.documentElement.setAttribute('data-palette', paletteId);
    set({ paletteId });
  },
}));

export function applyPalette(id: PaletteId) {
  document.documentElement.setAttribute('data-palette', id);
}
