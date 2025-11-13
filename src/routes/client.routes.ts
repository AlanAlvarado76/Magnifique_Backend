import { Router } from 'express';
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} from '../controllers/client.controller';

const router = Router();

// Obtener todos los clientes
router.get('/', getAllClients);

// Obtener cliente por ID
router.get('/client/:id', getClientById);

// Crear nuevo cliente
router.post('/create', createClient);

// Actualizar cliente
router.put('/update/:id', updateClient);

// Eliminar cliente
router.delete('/delete/:id', deleteClient);

export default router;
