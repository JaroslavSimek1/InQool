export interface User {
    id: string;
    name: string;
    gender: 'female' | 'male' | 'other';
    banned: boolean;
  }