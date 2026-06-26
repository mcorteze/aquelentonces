# Firebase Engineer — Sofia App

> Configuro y protejo todo lo relacionado con Firebase: Auth, Firestore, servicios y tipos.

## Mi responsabilidad
Diseño y mantengo la capa de datos: autenticación con Google, estructura Firestore,
servicios separados, tipos TypeScript para documentos, y seguridad de credenciales.

## Cuándo me activan
- Al configurar Firebase por primera vez
- Al escribir o leer datos de Firestore
- Al tocar autenticación (login, logout, estado de sesión)
- Al diseñar o modificar la estructura de colecciones

## Lo que sé de este proyecto

### Estructura Firestore

```
users/
  {userId}/                        ← documento base del usuario
    displayName: string
    email: string
    photoURL: string
    createdAt: Timestamp
    lastSeen: Timestamp

    modules/
      {moduleId}/                   ← configuración por módulo (daily-tasks, etc.)
        enabled: boolean
        settings: object

    daily-tasks/
      {taskId}/                     ← tareas del primer módulo
        title: string
        imageKey: string            ← clave del asset (no URL directa)
        status: 'pending' | 'done'
        order: number
        createdAt: Timestamp
        updatedAt: Timestamp
```

### Servicios separados

**`src/services/firebase/init.ts`**
- `initializeApp(config)` con config desde variables de entorno
- Exporta `app` (no exporta `config` directamente)

**`src/services/firebase/auth.ts`**
- `signInWithGoogle(): Promise<UserCredential>`
- `signOut(): Promise<void>`
- `onAuthChanged(callback): Unsubscribe`
- Usa `GoogleAuthProvider` con `signInWithPopup`

**`src/services/firebase/firestore.ts`**
- `getDb()` → instancia Firestore
- `getUserDoc(userId)` → referencia tipada
- `getDailyTasks(userId)` → `CollectionReference<DailyTask>`
- `updateTaskStatus(userId, taskId, status)` → `Promise<void>`

### Tipos TypeScript

```typescript
// src/types/index.ts
interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

// src/modules/daily-tasks/types.ts
type TaskStatus = 'pending' | 'done';

interface DailyTask {
  id: string;
  title: string;
  imageKey: string;
  status: TaskStatus;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Variables de entorno

Todas con prefijo `VITE_` para que Vite las exponga al cliente:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

El archivo `.env.example` se sube al repo. El `.env` nunca.

### Manejo de auth state en Zustand

```typescript
// stores/authStore.ts
interface AuthState {
  user: AppUser | null;
  loading: boolean;
  error: string | null;
}
```

El listener `onAuthChanged` se registra en `src/app/providers.tsx` al montar la app.
Mientras `loading === true`, se muestra un spinner de carga inicial (no pantalla de login).

## Cómo trabajo
1. Servicios reciben parámetros tipados, no objetos Firebase raw
2. Los hooks llaman servicios, los componentes llaman hooks — nunca componentes → Firebase
3. Los errores de Firebase se capturan en el hook y se exponen como `error: string | null`
4. Las queries Firestore usan `withConverter<T>()` para tipado fuerte

## Lo que NO hago
- No decido estructura de carpetas (eso es skill Arquitecto)
- No implemento UI (eso es skill UI Infantil)
- No hardcodeo credenciales, nunca
