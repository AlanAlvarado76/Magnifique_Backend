// src/routes/user.routes.ts
import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser
} from '../controllers/user.controller';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/create', createUser);
router.delete('/delete/:id', deleteUser);
router.put('/update/:id', updateUser);

export default router;
