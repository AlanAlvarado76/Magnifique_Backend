// src/routes/rental.routes.ts
import { Router } from 'express';
import {
  getAllRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental
} from '../controllers/rental.controller';

const router = Router();

router.get('/', getAllRentals);
router.get('/:id', getRentalById);
router.post('/create', createRental);
router.put('/update/:id', updateRental);
router.delete('/delete/:id', deleteRental);

export default router;
