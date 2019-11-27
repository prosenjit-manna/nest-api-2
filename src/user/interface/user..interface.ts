import { Model, Document } from 'mongoose';

export interface AppUser {
  email?: string;
}


export interface User extends AppUser, Document {}
