# Estructura Firestore — Sofia App

## Colecciones

```
users/
  {userId}/
    ├── displayName: string
    ├── email: string
    ├── photoURL: string
    ├── createdAt: Timestamp
    └── lastSeen: Timestamp

    modules/
      {moduleId}/             ← "daily-tasks", "drawing", etc.
        ├── enabled: boolean
        └── settings: object  ← configuración específica del módulo

    daily-tasks/
      {taskId}/
        ├── title: string     ← "Cepillarme los dientes"
        ├── imageKey: string  ← "teeth" → busca /assets/tasks/teeth.png
        ├── status: "pending" | "done"
        ├── order: number     ← para ordenar las tarjetas
        ├── createdAt: Timestamp
        └── updatedAt: Timestamp
```

## Reglas de diseño

- Cada usuario es dueño de sus datos: `users/{userId}/...`
- Los módulos futuros se agregan como sub-colecciones del usuario
- `imageKey` desacopla la imagen del storage: si se mueve un asset, solo se actualiza un campo
- `order` permite reordenar tareas sin tocar timestamps
- `updatedAt` se actualiza cada vez que cambia `status`

## Reglas de seguridad Firestore (a implementar)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Solo el usuario autenticado puede leer/escribir sus propios datos.
