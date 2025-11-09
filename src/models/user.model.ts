// src/models/user.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'Admin'|'Employee'|'User';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:     { type: String, enum: ['Admin', 'User'], default: 'User' }
  },
  {
    timestamps: true // genera createdAt y updatedAt
  }
);

export const User = mongoose.model<IUser>('User', UserSchema);
