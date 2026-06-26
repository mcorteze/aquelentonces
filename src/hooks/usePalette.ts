import { usePaletteStore } from '../stores/paletteStore';
import type { PaletteId } from '../types';

export const PALETTES: { id: PaletteId; label: string; accent: string; bg: string; dark: boolean }[] = [
  { id: 'kelvar',  label: 'Kelvar',  accent: '#1A7AE0', bg: '#080E18', dark: true  },
  { id: 'sorin',   label: 'Sorin',   accent: '#1A6ED0', bg: '#F4F8FE', dark: false },
  { id: 'merali',  label: 'Merali',  accent: '#3A7030', bg: '#F0F2E8', dark: false },
  { id: 'ferith',  label: 'Ferith',  accent: '#2A90C8', bg: '#F0F8FF', dark: false },
  { id: 'vakoun',  label: 'Vakoun',  accent: '#C0207A', bg: '#111318', dark: true  },
  { id: 'lirel',   label: 'Lirel',   accent: '#6A1AAA', bg: '#F4F2F8', dark: false },
  { id: 'grafito', label: 'Grafito', accent: '#D9A441', bg: '#16171B', dark: true  },
];

export function usePalette() {
  const paletteId  = usePaletteStore((s) => s.paletteId);
  const setPalette = usePaletteStore((s) => s.setPalette);
  return { paletteId, setPalette, palettes: PALETTES };
}
