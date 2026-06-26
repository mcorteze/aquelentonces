# Aquelentonces — Hub Operativo

> App web React tablet-first para madres y padres. Diario familiar: rutina diaria, notas, momentos, fotos comentadas e hitos de los hijos.
> Stack: React 18 + Vite + TypeScript strict + Firebase Auth + Firestore + Zustand 5 + CSS Modules.
> Desarrollo: `npm run dev` → `http://localhost:5450`

## Estado actual
App con 9 rutas funcionales. 4 módulos completos (Rutina, Diario, Fotos, Hijos). Firebase Storage diferido.

## Skills del equipo

| Skill | Archivo | Cuándo activarla |
|-------|---------|-----------------|
| Arquitecto | skills/arquitecto.md | Nueva carpeta, nuevo módulo, decisión de estado global, routing |
| Firebase Engineer | skills/firebase_engineer.md | Nuevas colecciones Firestore, Auth, reglas de seguridad |
| UI Visual | skills/ui_infantil.md | Cualquier componente visual, tokens de color, CSS |
| Deployment | skills/deployment_engineer.md | Build, variables de entorno, deploy a producción |

## Mapa de rutas activas

| Ruta | Módulo | Estado |
|------|--------|--------|
| `/` | Landing v4 | ✅ Completo |
| `/login` | Login 2 columnas | ✅ Completo |
| `/app/inicio` | HomePage 5 módulos | ✅ Completo |
| `/app/tareas` | Rutina Diaria (templates + instancias) | ✅ Completo |
| `/app/diario` | Diario + FAB global + "En este día" | ✅ Completo |
| `/app/fotos` | Fotos comentadas (mock-first, Storage diferido) | ✅ Completo |
| `/app/hijos` | Lista de hijos | ✅ Completo |
| `/app/hijos/:id` | El libro de [nombre] — perfil + timeline | ✅ Completo |
| `/app/perfil` | Perfil de usuario | ✅ Funcional |

## Mapa de documentación

| Doc | Cuándo leerlo |
|-----|--------------|
| `_flujo-activo.md` | SIEMPRE — al iniciar cualquier sesión |
| `src/modules/diary/types.ts` | Antes de tocar el Diario (EntryType, MoodTag, ENTRY_TYPE_META) |
| `src/modules/daily-tasks/types.ts` | Antes de tocar Rutina (TaskTemplate, DailyInstance, DayOfWeek) |
| `src/modules/photos/types.ts` | Antes de tocar Fotos (PhotoEntry, PhotoDay) |

## Colecciones Firestore

| Colección | Propósito |
|-----------|-----------|
| `users/{uid}/profile/main` | Perfil del usuario |
| `users/{uid}/children` | Hijos registrados |
| `users/{uid}/taskTemplates` | Plantillas de tareas de la rutina |
| `users/{uid}/taskInstances` | Instancias diarias de tareas completadas |
| `users/{uid}/diaryEntries` | Entradas del diario |
| `users/{uid}/photoEntries` | Fotos comentadas (imageUrl vacío hasta Storage) |

## Reglas que nunca se rompen

1. **Zustand selectores individuales**: `(s) => s.field` — NUNCA destructuring `({ field }) => field` (causa infinite loops).
2. **CSS tokens siempre**: usar `var(--aq-s-*)` o `var(--sofia-*)` — NUNCA hex directo en componentes.
3. **Sin translateY en hover**: prohibido. Solo `box-shadow` u `opacity` en hover.
4. **Mock-first**: Firebase Storage, MercadoPago, integraciones externas = diferidos. Siempre separar AHORA vs DIFERIDO.
5. **Sin credenciales en código**: todo por `.env`. El `.env.example` vive en el repo, el `.env` no.
6. **No mezclar Firebase en componentes visuales**: toda lógica de datos va en hooks o servicios.

## Flujo activo
Leer `_flujo-activo.md` antes de empezar cualquier tarea. Contiene el estado vivo del proyecto.
