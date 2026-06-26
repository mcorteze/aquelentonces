import { usePaletteStore } from '../stores/paletteStore';
import type { PaletteId } from '../types';

export const PALETTES: { id: PaletteId; label: string; accent: string; bg: string; dark: boolean }[] = [
  { id: 'aurora',  label: 'Aurora',  accent: '#E8594A', bg: '#FDFAF6', dark: false },
  { id: 'lirel',   label: 'Lirel',   accent: '#7C3AED', bg: '#F7F4FC', dark: false },
  { id: 'merali',  label: 'Merali',  accent: '#3A8030', bg: '#F2F4EC', dark: false },
  { id: 'ferith',  label: 'Ferith',  accent: '#2A90C8', bg: '#F2F8FE', dark: false },
  { id: 'kelvar',  label: 'Kelvar',  accent: '#1A7AE0', bg: '#080E18', dark: true  },
  { id: 'vakoun',  label: 'Vakoun',  accent: '#E0307A', bg: '#111318', dark: true  },
  { id: 'grafito', label: 'Grafito', accent: '#D9A441', bg: '#16171B', dark: true  },
];

export function usePalette() {
  const paletteId  = usePaletteStore((s) => s.paletteId);
  const setPalette = usePaletteStore((s) => s.setPalette);
  return { paletteId, setPalette, palettes: PALETTES };
}
