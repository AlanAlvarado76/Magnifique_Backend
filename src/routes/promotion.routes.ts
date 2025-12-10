import { Router, Request, Response } from 'express';
import {
  getAllPromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion
} from '../controllers/promotion.controller';

import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/authorizeRole';

const router = Router();

// Obtener todas las promociones
router.get(
  '/',
  authenticateToken,
  authorizeRoles(['Admin', 'User', 'Client']),
  (req: Request, res: Response) => {
    getAllPromotions(req, res);
  }
);

// Obtener una promoción por ID
router.get(
  '/promotion/:id',
  authenticateToken,
  authorizeRoles(['Admin', 'User', 'Client']),
  (req: Request, res: Response) => {
    getPromotionById(req, res);
  }
);

// Crear una nueva promoción
router.post(
  '/create',
  authenticateToken,
  authorizeRoles(['Admin']),
  (req: Request, res: Response) => {
    createPromotion(req, res);
  }
);

// Actualizar una promoción existente
router.put(
  '/update/:id',
  authenticateToken,
  authorizeRoles(['Admin']),
  (req: Request, res: Response) => {
    updatePromotion(req, res);
  }
);

// Eliminar una promoción
router.delete(
  '/delete/:id',
  authenticateToken,
  authorizeRoles(['Admin']),
  (req: Request, res: Response) => {
    deletePromotion(req, res);
  }
);

export default router;
