# Flujo activo — Sofia App
Actualizado: 2026-06-26

## Tarea actual
Base arquitectónica completa. Pendiente: conectar Firebase real (crear proyecto + .env).

## Decisiones tomadas esta sesión
- 2026-06-26 Stack elegido: React 18 + Vite + TypeScript + Firebase + Zustand + CSS Modules
- 2026-06-26 Zustand > Context API: menos boilerplate, sin Provider wrapping
- 2026-06-26 CSS Modules > Tailwind: encapsulamiento real, control tablet-first
- 2026-06-26 Tema visual: KELVAR (Dojo tema-15) — azul medianoche #080E18 + azul eléctrico #1A7AE0
- 2026-06-26 Puerto de desarrollo: 5173 (Vite default, cambiar en vite.config.ts si hay conflicto)
- 2026-06-26 Estructura Firestore: users/{userId}/daily-tasks/{taskId}
- 2026-06-26 Módulo inicial daily-tasks: completado e integrado

## Completado
- [x] Proyecto Vite + TypeScript creado
- [x] Firebase, Zustand, React Router instalados
- [x] Estructura de carpetas: app/, modules/, components/, layouts/, services/, stores/, hooks/, types/, theme/, utils/
- [x] Tokens KELVAR en src/theme/tokens.css
- [x] Firebase: init.ts, auth.ts (Google Sign-In), firestore.ts (tipado)
- [x] Zustand authStore con user / loading / error
- [x] Hook useAuth
- [x] FirebaseAuthProvider (listener onAuthChanged en providers.tsx)
- [x] Tipos TypeScript: AppUser, DailyTask, TaskStatus
- [x] Módulo daily-tasks: service, hook useDailyTasks, TaskCard, TaskList, TaskStatusControl, DailyTasksPage
- [x] Layouts: AuthLayout, AppLayout (con topbar + avatar + logout)
- [x] LoginScreen con Google Sign-In
- [x] Spinner de carga inicial
- [x] Router con PrivateRoute → redirige a /login si no autenticado
- [x] .env.example documentado
- [x] .gitignore protege .env
- [x] Build de producción limpio (tsc + vite build ✓)

## Pendiente
- [ ] Crear proyecto Firebase en console.firebase.google.com
- [ ] Copiar credenciales a .env (basarse en .env.example)
- [ ] Habilitar Google Sign-In en Firebase Authentication
- [ ] Crear reglas de seguridad Firestore (ver docs/estructura-firestore.md)
- [ ] Probar flujo completo: login → lista de tareas → toggle
- [ ] Agregar datos de prueba en Firestore (colección users/{uid}/daily-tasks)
- [ ] Ajustar puerto en vite.config.ts si hay conflicto con otros proyectos

## Contexto crítico (lo que no puede olvidarse)
- Tema KELVAR: #080E18 fondo / #1A7AE0 acento. Tokens en src/theme/tokens.css con prefijo --sofia-*
- No mezclar Firebase en componentes: toda lógica va en services/ y hooks/
- Tablet-first: 1024px es el diseño principal
- El TaskCard tiene fallback emoji si no existe el PNG en /assets/tasks/[key].png
- Optimistic update en useDailyTasks.toggle (revierte si el write falla)

## Para arrancar
```bash
cd C:\Proyectos\sofia
npm run dev
# → http://localhost:5173
```

## Historial de esta sesión
- 09:00 Proyecto definido, arquitectura planificada
- 09:30 Documentación del sistema creada (CLAUDE.md, skills, memory-map, flujo)
- 09:50 Tema visual definido: KELVAR (Dojo tema-15)
- 10:00 Proyecto Vite creado + dependencias instaladas
- 10:20 Arquitectura implementada completa (todos los archivos)
- 10:30 Build limpio verificado con tsc + vite build
