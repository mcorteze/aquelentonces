# Módulos — Sofia App

Cada módulo vive en `src/modules/[nombre]/` y tiene su propio hook, servicio, tipos y componentes.

## Módulo 1: daily-tasks (Visualizador de tareas del día)

**Estado**: planificado — pendiente de implementación.
**Ruta**: `/app/tareas`

### Qué hace
Muestra la lista de tareas del día de la niña en tarjetas grandes, con control para
marcar cada tarea como completada o pendiente.

### Layout de tarjeta
```
┌──────────────────────────────────────────────────────────────┐
│  [Control ✓/✗]   [Imagen tarea]   [Texto de la tarea]       │
│     80x80px        120x120px        font-size: 22px+         │
└──────────────────────────────────────────────────────────────┘
```

### Archivos del módulo
```
src/modules/daily-tasks/
├── components/
│   ├── TaskCard.tsx           ← Tarjeta individual
│   ├── TaskCard.module.css
│   ├── TaskList.tsx           ← Lista de tarjetas
│   ├── TaskList.module.css
│   ├── EmptyState.tsx         ← Cuando no hay tareas
│   └── TaskStatusControl.tsx  ← El control ✓/✗ grande
├── hooks/
│   └── useDailyTasks.ts       ← Lee/escribe tareas del usuario
├── services/
│   └── dailyTasksService.ts   ← Queries Firestore tipadas
├── types.ts                   ← DailyTask, TaskStatus
└── DailyTasksPage.tsx         ← Página completa del módulo
```

### Estados del módulo
- **loading**: skeleton de tarjetas (mismo layout, sin contenido)
- **vacío**: ilustración amable + mensaje "No hay tareas para hoy"
- **error**: mensaje simple de error + botón de reintento
- **con datos**: lista de tarjetas del día

### Assets de imágenes
Por ahora: placeholders con color de fondo y emoji. La estrategia final:
- Las imágenes vivirán en `public/assets/tasks/[imageKey].png`
- El campo `imageKey` en Firestore apunta al nombre del archivo (sin path)
- No URLs externas por ahora

## Módulos futuros (NO implementar aún)
- `drawing` — Lienzo de dibujo libre
- `memory-game` — Juego de memoria con cartas
- `stories` — Cuentos interactivos
- `music` — Actividades con sonido y música
