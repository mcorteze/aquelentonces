# Sofia App — Hub Operativo

> App web React para actividades, juegos y tareas entretenidas para una niña preescolar.
> Stack: React 18 + Vite + TypeScript + Firebase Auth + Firestore + Zustand + CSS Modules.
> Desarrollo: `npm run dev` desde la raíz → frontend `:5500` (puerto por definir).

## Estado actual
Proyecto en arquitectura inicial. Tema visual pendiente de definición por el usuario.
Módulo 1 (daily-tasks) planificado, sin implementar.

## Skills del equipo

| Skill | Archivo | Cuándo activarla |
|-------|---------|-----------------|
| Arquitecto | skills/arquitecto.md | Estructura de carpetas, estado global, routing, decisiones técnicas |
| Firebase Engineer | skills/firebase_engineer.md | Auth, Firestore, servicios, tipos de documentos |
| UI Infantil | skills/ui_infantil.md | Cualquier componente visual. REQUIERE tema aprobado |
| Deployment | skills/deployment_engineer.md | Build, variables de entorno, deploy a producción |

## Mapa de documentación

| Doc | Cuándo leerlo |
|-----|--------------|
| docs/modulos.md | Antes de implementar o extender cualquier módulo |
| docs/estructura-firestore.md | Antes de leer o escribir en Firestore |
| _flujo-activo.md | Al iniciar cualquier sesión |

## Reglas que nunca se rompen

1. **Tablet-first**: diseñar primero para tablet horizontal (1024x768), luego mobile, luego desktop.
2. **Sin credenciales en código**: todo por `.env`. El `.env.example` vive en el repo, el `.env` no.
3. **No mezclar Firebase en componentes visuales**: toda lógica de datos va en hooks o servicios.
4. **Tema visual bloqueado**: NO implementar estilos finales sin que el usuario apruebe el tema visual.
5. **Un módulo a la vez**: no avanzar módulos futuros sin cerrar el actual.

## Flujo activo
Si existe `_flujo-activo.md` → leerlo antes de empezar.
