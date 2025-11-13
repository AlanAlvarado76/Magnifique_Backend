import { Router } from 'express';
import {
  getAllPromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion
} from '../controllers/promotion.controller';

const router = Router();

// Obtener todas las promociones
router.get('/', getAllPromotions);

// Obtener una promoción por ID
router.get('/promotion/:id', getPromotionById);

// Crear una nueva promoción
router.post('/create', createPromotion);

// Actualizar una promoción existente
router.put('/update/:id', updatePromotion);

// Eliminar una promoción
router.delete('/delete/:id', deletePromotion);

export default router;
