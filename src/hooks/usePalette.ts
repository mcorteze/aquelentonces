import { usePaletteStore } from '../stores/paletteStore';
import type { PaletteId } from '../types';

export const PALETTES: { id: PaletteId; label: string; accent: string; bg: string; dark: boolean }[] = [
  { id: 'aquelentonces', label: 'Aquelentonces', accent: '#E5FE73', bg: '#417178', dark: true  },
  { id: 'kelvar',        label: 'Kelvar',        accent: '#1A7AE0', bg: '#080E18', dark: true  },
];

export function usePalette() {
  const paletteId  = usePaletteStore((s) => s.paletteId);
  const setPalette = usePaletteStore((s) => s.setPalette);
  return { paletteId, setPalette, palettes: PALETTES };
}
