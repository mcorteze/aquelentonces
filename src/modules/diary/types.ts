export type EntryType =
  | 'momento'
  | 'logro'
  | 'anecdota'
  | 'primer-vez'
  | 'dia';

export type MoodTag =
  | 'genial'
  | 'tranquilo'
  | 'dificil'
  | 'especial'
  | 'normal';

export interface DiaryEntry {
  id: string;
  date: string;           // YYYY-MM-DD
  type: EntryType;
  body: string;
  mood?: MoodTag;
  childId?: string;       // hijo al que pertenece (opcional si no hay hijos)
  tags: string[];
  linkedTaskIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

/** Agrupación por fecha para la línea de tiempo */
export interface DiaryDay {
  date: string;
  entries: DiaryEntry[];
}

export const ENTRY_TYPE_META: Record<EntryType, { label: string; prompt: string; color: string }> = {
  momento:    { label: 'Momento',     prompt: '¿Qué pasó? Captura el instante…',              color: '#A6B1E7' },
  logro:      { label: 'Logro',       prompt: '¿Qué logró hoy?',                               color: '#C0D2C7' },
  anecdota:   { label: 'Anécdota',    prompt: '¿Qué te hizo reír o sorprender?',               color: '#E5FE73' },
  'primer-vez': { label: 'Primera vez', prompt: '¿Qué fue la primera vez que hizo?',           color: '#FAF6ED' },
  dia:        { label: 'El día',       prompt: '¿Cómo fue el día hoy?',                        color: '#417178' },
};

export const MOOD_META: Record<MoodTag, { label: string; symbol: string }> = {
  genial:    { label: 'Genial',    symbol: '✦' },
  tranquilo: { label: 'Tranquilo', symbol: '◌' },
  dificil:   { label: 'Difícil',   symbol: '◎' },
  especial:  { label: 'Especial',  symbol: '★' },
  normal:    { label: 'Normal',    symbol: '·' },
};
