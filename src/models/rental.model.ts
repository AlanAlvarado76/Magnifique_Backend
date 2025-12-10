import mongoose, { Schema, Document } from 'mongoose';

export interface IRental extends Document {
  clientId: mongoose.Types.ObjectId;
  clientName: string;
  clientEmail: string;
  clientPhone: string;

  dress: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: string;

  // Nuevos campos
  isDamaged: boolean;
  repairCost: number;
  replacementCost: number;
  damageNotes: string;
}

const RentalSchema = new Schema<IRental>(
  {
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientPhone: { type: String, required: true },

    dress: { type: Schema.Types.ObjectId, ref: 'Dress', required: true },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    totalPrice: { type: Number, required: true },

    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled', 'damaged', 'lost'],
      default: 'active'
    },
    
    // NUEVOS CAMPOS PARA MANEJO DE DAÑOS 
    isDamaged: { type: Boolean, default: false },

    // Costo por reparación (si el vestido sufrió daños pero sigue usable)
    repairCost: { type: Number, default: 0 },

    // Costo por reposición total (si el vestido se perdió o quedó inservible)
    replacementCost: { type: Number, default: 0 },

    // Notas descriptivas del daño
    damageNotes: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Rental = mongoose.model<IRental>('Rental', RentalSchema);
