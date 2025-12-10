// src/routes/rental.routes.ts

import { Router, Request, Response } from 'express';
import {
  getAllRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental,
  reportDamage,
} from '../controllers/rental.controller';

import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/authorizeRole';

const router = Router();

// Obtener todas las rentas
router.get(
  '/',
  authenticateToken,
  authorizeRoles(['Admin', 'User']),
  (req: Request, res: Response) => {
    getAllRentals(req, res);
  }
);

// Obtener una renta por ID
router.get(
  '/:id',
  authenticateToken,
  authorizeRoles(['Admin', 'User']),
  (req: Request, res: Response) => {
    getRentalById(req, res);
  }
);

// Crear una nueva renta
router.post(
  '/create',
  authenticateToken,
  authorizeRoles(['Admin', 'User']),
  (req: Request, res: Response) => {
    createRental(req, res);
  }
);

// Actualizar una renta existente
router.put(
  '/update/:id',
  authenticateToken,
  authorizeRoles(['Admin', 'User']),
  (req: Request, res: Response) => {
    updateRental(req, res);
  }
);

// Reportar daño en una renta
router.put(
  '/damage/:id',
  authenticateToken,
  authorizeRoles(['Admin']), // Solo Admin debe poder registrar daños
  (req: Request, res: Response) => {
    reportDamage(req, res);
  }
);

// Eliminar una renta
router.delete(
  '/delete/:id',
  authenticateToken,
  authorizeRoles(['Admin']), // Solo Admin puede eliminar
  (req: Request, res: Response) => {
    deleteRental(req, res);
  }
);

export default router;
