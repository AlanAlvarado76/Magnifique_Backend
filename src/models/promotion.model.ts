// src/models/promotion.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IPromotion extends Document {
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  status: 'Activa' | 'Inactiva' | 'Finalizada';
  createdAt: Date;
  updatedAt: Date;
}

const PromotionSchema = new Schema<IPromotion>(
  {
    title: {
      type: String,
      required: true,
      minlength: 3
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    description: {
      type: String,
      required: true,
      minlength: 10
    },
    status: {
      type: String,
      enum: ['Activa', 'Inactiva', 'Finalizada'],
      default: 'Activa'
    }
  },
  {
    timestamps: true
  }
);

export const Promotion = mongoose.model<IPromotion>('Promotion', PromotionSchema);
