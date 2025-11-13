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

//Obtener todos los usuarios
router.get('/', getAllUsers);
//Obtener usuario por Id
router.get('/:id', getUserById);
//Crear Usuario
router.post('/create', createUser);
//Borrar Usuario
router.delete('/delete/:id', deleteUser);
//Actualizar Usuario
router.put('/update/:id', updateUser);

export default router;
