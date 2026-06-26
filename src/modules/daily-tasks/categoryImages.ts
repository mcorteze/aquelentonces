import type { TaskCategory } from './types';

/**
 * Imagen representativa por categoría.
 * Seeds fijos de picsum.photos — la misma foto siempre para cada categoría.
 * Formato: https://picsum.photos/seed/{seed}/400/300
 */
export const CATEGORY_IMAGE: Record<TaskCategory, string> = {
  rutina:   'https://picsum.photos/seed/aqrutina/400/300',
  deporte:  'https://picsum.photos/seed/aqdeporte/400/300',
  escuela:  'https://picsum.photos/seed/aqescuela/400/300',
  arte:     'https://picsum.photos/seed/aqarte/400/300',
  social:   'https://picsum.photos/seed/aqsocial/400/300',
  salud:    'https://picsum.photos/seed/aqsalud/400/300',
  juego:    'https://picsum.photos/seed/aqujuego/400/300',
  familia:  'https://picsum.photos/seed/aqfamilia/400/300',
  otro:     'https://picsum.photos/seed/aqotro/400/300',
};

/** Color de acento por categoría (para el fondo del check y detalles) */
export const CATEGORY_COLOR: Record<TaskCategory, string> = {
  rutina:   '#417178',
  deporte:  '#E5FE73',
  escuela:  '#A6B1E7',
  arte:     '#F4B8A0',
  social:   '#C0D2C7',
  salud:    '#7EC8A4',
  juego:    '#FFD166',
  familia:  '#E5C3E8',
  otro:     '#CCCCCC',
};

export const CATEGORY_LABEL: Record<TaskCategory, string> = {
  rutina:   'Rutina',
  deporte:  'Deporte',
  escuela:  'Escuela',
  arte:     'Arte',
  social:   'Social',
  salud:    'Salud',
  juego:    'Juego',
  familia:  'Familia',
  otro:     'Otro',
};
