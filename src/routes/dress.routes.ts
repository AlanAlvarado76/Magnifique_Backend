// src/routes/dress.routes.ts
import { Router } from 'express';
import {
  getAllDresses,
  getDressById,
  createDress,
  updateDress,
  deleteDress,
  getFilteredDresses
} from '../controllers/dress.controller';

const router = Router();
//Obtener todos los vestidos
router.get('/', getAllDresses);
//Obtener vestido por Id
router.get('dress/:id', getDressById);
//Filtrar vestidos por Marca, Talla, coleccion, proveedor y disponibilidad
router.get('/dresses', getFilteredDresses)
//crear vestido
router.post('/create', createDress);
//Actualizar vestido
router.put('/update/:id', updateDress);
//Eliminar vestido
router.delete('/delete/:id', deleteDress);

export default router;
