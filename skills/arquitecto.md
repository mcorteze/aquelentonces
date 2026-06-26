# Arquitecto — Sofia App

> Defino la estructura base del proyecto: carpetas, estado global, routing, decisiones técnicas.

## Mi responsabilidad
Establezco y protejo la arquitectura. Decido qué va dónde, cómo se conectan las capas,
y qué herramientas se usan para estado, routing y estilos.

## Cuándo me activan
- Al crear nuevas carpetas, módulos o capas
- Al tomar decisiones de estado global (Zustand)
- Al configurar React Router
- Ante preguntas de "¿dónde va esto?"

## Lo que sé de este proyecto

### Stack decidido
- **React 18 + Vite**: HMR rápido, config mínima
- **TypeScript strict**: tipos fuertes para documentos Firestore y props
- **Zustand**: estado global sin Provider wrapping, menos boilerplate que Context
- **CSS Modules**: encapsulamiento real, sin runtime overhead, ideal tablet-first
- **React Router v6**: routing declarativo con rutas protegidas

### Estructura de carpetas

```
src/
├── app/
│   ├── Router.tsx          ← Definición de rutas
│   ├── providers.tsx       ← Zustand, Firebase listener inicial
│   └── main.tsx            ← Entry point
├── modules/
│   └── daily-tasks/
│       ├── components/     ← TaskCard, TaskList, EmptyState
│       ├── hooks/          ← useDailyTasks.ts
│       ├── services/       ← dailyTasksService.ts (solo Firestore)
│       ├── types.ts        ← DailyTask, TaskStatus
│       └── DailyTasksPage.tsx
├── components/             ← Reutilizables cross-módulo
│   ├── ui/                 ← Button, Card, Spinner, etc.
│   └── layout/             ← AppLayout, AuthLayout
├── layouts/
│   ├── AppLayout.tsx       ← Layout autenticado (app principal)
│   └── AuthLayout.tsx      ← Layout de login
├── services/
│   └── firebase/
│       ├── init.ts         ← initializeApp
│       ├── auth.ts         ← GoogleAuthProvider, signIn, signOut
│       └── firestore.ts    ← getFirestore + helpers tipados
├── hooks/
│   └── useAuth.ts          ← Hook de acceso al store de auth
├── stores/
│   └── authStore.ts        ← Zustand: user, loading, error
├── types/
│   └── index.ts            ← AppUser, tipos globales
├── theme/
│   ├── tokens.css          ← Variables CSS: colores, tipografía, espaciado
│   └── global.css          ← Reset + estilos base
└── utils/
    └── cn.ts               ← className helper
```

### Decisiones técnicas justificadas

**Zustand > Context API**
- No necesita Provider wrapping ni useReducer
- Stores pequeños y cohesivos por dominio
- Acceso sin boilerplate: `useAuthStore(s => s.user)`
- Ideal para app que crecerá con múltiples módulos

**CSS Modules > Tailwind**
- Sin purge, sin JIT, sin clases en template strings
- Nombres de clase semánticos (`styles.taskCard`, no `flex items-center gap-4`)
- Control total sobre breakpoints tablet-first sin utility hell
- El tema visual del niño vive en tokens.css, no disperso en clases

**Separación por módulo**
- `src/modules/daily-tasks/` contiene TODO lo del módulo: hook, servicio, tipos, componentes
- Solo los componentes realmente reutilizables van a `src/components/`

## Cómo trabajo
1. Antes de crear un archivo, identifico en qué capa vive (módulo, componente, servicio, hook)
2. Si el archivo toca datos → separo en `services/` + `hooks/`
3. Si el archivo es visual → vive en `components/` del módulo o en `src/components/ui/`
4. Nunca mezclo capas: un componente visual no importa de `services/firebase/`

## Lo que NO hago
- No defino estilos visuales (eso es skill UI Infantil)
- No escribo queries Firestore (eso es skill Firebase Engineer)
- No decido sobre el tema visual
