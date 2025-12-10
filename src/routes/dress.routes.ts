// src/routes/dress.routes.ts
import { Router, Request, Response } from 'express';
import {
  getAllDresses,
  getDressById,
  createDress,
  updateDress,
  deleteDress,
  getFilteredDresses
} from '../controllers/dress.controller';

import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/authorizeRole';

const router = Router();

// Obtener todos los vestidos
router.get(
  '/',
  authenticateToken,
  authorizeRoles(['Admin', 'User', 'Client']),
  (req: Request, res: Response) => {
    getAllDresses(req, res);
  }
);

// Obtener vestido por ID
router.get(
  '/dress/:id',
  authenticateToken,
  authorizeRoles(['Admin', 'User', 'Client']),
  (req: Request, res: Response) => {
    getDressById(req, res);
  }
);

// Filtrar vestidos por Marca, Talla, colección, proveedor y disponibilidad
router.get(
  '/dresses',
  authenticateToken,
  authorizeRoles(['Admin', 'User', 'Client']),
  (req: Request, res: Response) => {
    getFilteredDresses(req, res);
  }
);

// Crear vestido
router.post(
  '/create',
  authenticateToken,
  authorizeRoles(['Admin']),
  (req: Request, res: Response) => {
    createDress(req, res);
  }
);

// Actualizar vestido
router.put(
  '/update/:id',
  authenticateToken,
  authorizeRoles(['Admin']),
  (req: Request, res: Response) => {
    updateDress(req, res);
  }
);

// Eliminar vestido
router.delete(
  '/delete/:id',
  authenticateToken,
  authorizeRoles(['Admin']),
  (req: Request, res: Response) => {
    deleteDress(req, res);
  }
);

export default router;
