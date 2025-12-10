// src/routes/user.routes.ts

import { Router, Request, Response } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser
} from '../controllers/user.controller';

import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/authorizeRole';

const router = Router();

// Obtener todos los usuarios
router.get(
  '/',
  authenticateToken,
  authorizeRoles(['Admin']),
  (req: Request, res: Response) => {
    getAllUsers(req, res);
  }
);

// Obtener usuario por ID
router.get(
  '/:id',
  authenticateToken,
  authorizeRoles(['Admin']),
  (req: Request, res: Response) => {
    getUserById(req, res);
  }
);

// Crear usuario
router.post(
  '/create',
  authenticateToken,
  authorizeRoles(['Admin']),
  (req: Request, res: Response) => {
    createUser(req, res);
  }
);

// Eliminar usuario
router.delete(
  '/delete/:id',
  authenticateToken,
  authorizeRoles(['Admin']),
  (req: Request, res: Response) => {
    deleteUser(req, res);
  }
);

// Actualizar usuario
router.put(
  '/update/:id',
  authenticateToken,
  authorizeRoles(['Admin']),
  (req: Request, res: Response) => {
    updateUser(req, res);
  }
);

export default router;
