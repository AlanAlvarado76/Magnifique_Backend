import mongoose, { Document, Schema } from 'mongoose';

export interface IDress extends Document {
  name: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  color: string;
  brand: string;
  collectionDress: string;
  purchasePrice: number;
  salePrice: number;
  rentalPrice: number;
  supplier: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DressSchema = new Schema<IDress>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    size: {
      type: String,
      required: true,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    color: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true,
      minlength: 2
    },
    collectionDress: {
      type: String,
      required: true,
      minlength: 3
    },
    purchasePrice: {
      type: Number,
      required: true,
      min: 0
    },
    salePrice: {
      type: Number,
      required: true,
      min: 0
    },
    rentalPrice: {
      type: Number,
      required: true,
      min: 0
    },
    supplier: {
      type: String,
      required: true,
      minlength: 3
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const Dress = mongoose.model<IDress>('Dress', DressSchema);
