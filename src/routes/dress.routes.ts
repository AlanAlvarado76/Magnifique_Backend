// src/routes/dress.routes.ts
import { Router } from 'express';
import {
  getAllDresses,
  getDressById,
  createDress,
  updateDress,
  deleteDress
} from '../controllers/dress.controller';

const router = Router();

router.get('/', getAllDresses);
router.get('/:id', getDressById);
router.post('/create', createDress);
router.put('/update/:id', updateDress);
router.delete('/delete/:id', deleteDress);

export default router;
