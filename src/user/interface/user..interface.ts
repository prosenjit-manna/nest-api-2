import { Model, Document } from 'mongoose';

export interface AppUser {
  email?: string;
  password?: string;
}

export interface User extends AppUser, Document {}
