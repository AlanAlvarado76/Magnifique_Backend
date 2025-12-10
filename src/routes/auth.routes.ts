// src/routes/auth.routes.ts
import { Router, Request, Response } from "express";
import { loginUser, logoutUser } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/authorizeRole';

const router = Router();

router.post('/login', loginUser);

// Logout simple (solo requiere un token válido)
router.post(
  "/logout",
  authenticateToken,
  (req: Request, res: Response) => {
    logoutUser(req, res);
  }
);

export default router;
