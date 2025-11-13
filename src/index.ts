import express from 'express';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes'
import dressRoutes from './routes/dress.routes'
import rentalRoutes from './routes/rental.routes'
import authRoutes from './routes/auth.routes'
import clientRoutes from './routes/client.routes'
import promotionRoutes from './routes/promotion.routes'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/dress', dressRoutes);
app.use('/api/rental', rentalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/promotion', promotionRoutes);


// Iniciar servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
});
