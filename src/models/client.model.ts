import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new Schema<IClient>(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 3
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, 'El teléfono debe tener 10 dígitos']
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Correo electrónico no válido']
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true,
      match: [/^\d{5}$/, 'El código postal debe tener 5 dígitos']
    }
  },
  {
    timestamps: true
  }
);

export const Client = mongoose.model<IClient>('Client', ClientSchema);
