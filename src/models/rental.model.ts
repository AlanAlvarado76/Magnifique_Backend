// src/models/rental.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IRental extends Document {
  clientName: string;
  clientId: string; // 🆔 Identificación oficial
  clientEmail: string;
  clientPhone: string;
  dress: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'cancelled';
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const RentalSchema = new Schema<IRental>(
  {
    clientName:   { type: String, required: true },
    clientId:     { type: String, required: true }, // Nuevo campo
    clientEmail:  { type: String, required: true },
    clientPhone:  { type: String, required: true },
    dress:        { type: Schema.Types.ObjectId, ref: 'Dress', required: true },
    startDate:    { type: Date, required: true },
    endDate:      { type: Date, required: true },
    status:       { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
    totalPrice:   { type: Number, required: true }
  },
  { timestamps: true }
);

export const Rental = mongoose.model<IRental>('Rental', RentalSchema);
