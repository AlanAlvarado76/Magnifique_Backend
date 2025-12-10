import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'Admin' | 'User' | 'Client';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'El nombre de usuario es obligatorio'],
      minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'El correo es obligatorio'],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Debe ser un correo válido'
      ],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    role: {
      type: String,
      enum: ['Admin', 'User', 'Client'],
      default: 'User'
    }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
