import { Router, Request, Response } from "express";
import {
  createClient,
  updateClient,
  deleteClient,
  getAllClients,
  getClientById,
} from "../controllers/client.controller";

import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/authorizeRole";

const router = Router();

// Crear cliente
router.post(
  "/create",
  authenticateToken,
  authorizeRoles(["Admin", "User"]),
  (req: Request, res: Response) => {
    createClient(req, res);
  }
);

// Obtener todos los clientes
router.get(
  "/",
  authenticateToken,
  authorizeRoles(["Admin", "User"]),
  (req: Request, res: Response) => {
    getAllClients(req, res);
  }
);

// Obtener un cliente por ID
router.get(
  "/:clientId",
  authenticateToken,
  authorizeRoles(["Admin", "User"]),
  (req: Request, res: Response) => {
    getClientById(req, res);
  }
);

// Actualizar cliente
router.put(
  "/update/:clientId",
  authenticateToken,
  authorizeRoles(["Admin", "User"]),
  (req: Request, res: Response) => {
    updateClient(req, res);
  }
);

// Eliminar cliente
router.put(
  "/delete/:clientId",
  authenticateToken,
  authorizeRoles(["Admin"]), // Solo Admin debería poder eliminar
  (req: Request, res: Response) => {
    deleteClient(req, res);
  }
);

export default router;
