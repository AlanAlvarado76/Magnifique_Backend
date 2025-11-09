// src/models/dress.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IDress extends Document {
  name: string;
  size: string;
  color: string;
  price: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DressSchema = new Schema<IDress>(
  {
    name:      { type: String, required: true },
    size:      { type: String, required: true },
    color:     { type: String, required: true },
    price:     { type: Number, required: true },
    available: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

export const Dress = mongoose.model<IDress>('Dress', DressSchema);
