export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
// 0=Dom, 1=Lun, 2=Mar, 3=Mié, 4=Jue, 5=Vie, 6=Sáb

export type TaskStatus = 'pending' | 'done';

/** Plantilla de tarea: la tarea base que el usuario crea */
export interface TaskTemplate {
  id: string;
  title: string;
  category: TaskCategory;
  description?: string;
  /** Días de la semana en que aparece esta tarea (0-6) */
  days: DayOfWeek[];
  /** Variaciones por día: clave = DayOfWeek como string, valor = texto de variación */
  variations: Record<string, string>;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskCategory =
  | 'rutina'
  | 'deporte'
  | 'escuela'
  | 'arte'
  | 'social'
  | 'salud'
  | 'juego'
  | 'familia'
  | 'otro';

/** Instancia diaria: registro de que una tarea fue completada en una fecha */
export interface DailyInstance {
  id: string;
  templateId: string;
  date: string;          // formato YYYY-MM-DD
  dayOfWeek: DayOfWeek;
  status: TaskStatus;
  note?: string;
  completedAt?: Date;
  createdAt: Date;
}

/** Vista compuesta para mostrar en la pantalla del día */
export interface TaskTodayView {
  templateId: string;
  instanceId: string | null;
  title: string;
  category: TaskCategory;
  description?: string;
  variationText?: string;
  status: TaskStatus;
}
