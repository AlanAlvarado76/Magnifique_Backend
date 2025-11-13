import mongoose, { Document, Schema } from 'mongoose';

export interface IRental extends Document {
  clientId: mongoose.Types.ObjectId;   // ID del cliente
  clientName: string;                  // Nombre del cliente (snapshot)
  clientEmail: string;                 // Email del cliente (snapshot)
  clientPhone: string;                 // Teléfono del cliente (snapshot)
  dress: mongoose.Types.ObjectId;      // Vestido rentado
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'cancelled';
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const RentalSchema = new Schema<IRental>(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true
    },
    clientName: {
      type: String,
      required: true,
      minlength: 3
    },
    clientEmail: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, 'Correo electrónico no válido']
    },
    clientPhone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, 'El número de teléfono debe tener 10 dígitos']
    },
    dress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dress',
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active'
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true // crea createdAt y updatedAt automáticamente
  }
);

export const Rental = mongoose.model<IRental>('Rental', RentalSchema);
