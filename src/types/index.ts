export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export type PaletteId =
  | 'aquelentonces'
  | 'kelvar';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  paletteId: PaletteId;
  createdAt: Date;
  lastSeenAt: Date;
}

export interface Child {
  id: string;
  name: string;
  birthDate: string;    // ISO date string 'YYYY-MM-DD'
  avatarEmoji: string;
  order: number;
  active: boolean;
  createdAt: Date;
}
