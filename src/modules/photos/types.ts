export interface PhotoEntry {
  id: string;
  caption: string;
  imageUrl: string;     // vacío hasta integrar Firebase Storage
  date: string;         // 'YYYY-MM-DD'
  childId?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PhotoDay {
  date: string;
  photos: PhotoEntry[];
}
