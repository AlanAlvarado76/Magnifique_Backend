// src/controllers/dress.controller.ts
import { Request, Response } from 'express';
import { Dress } from '../models/dress.model';

// Obtener todos los vestidos
export const getAllDresses = async (_req: Request, res: Response) => {
  try {
    const dresses = await Dress.find();
    res.status(200).json(dresses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener vestidos', error });
  }
};

// Obtener vestido por ID
export const getDressById = async (req: Request, res: Response) => {
  try {
    const dress = await Dress.findById(req.params.id);
    if (!dress) return res.status(404).json({ message: 'Vestido no encontrado' });
    res.status(200).json(dress);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener vestido', error });
  }
};

// Crear vestido
export const createDress = async (req: Request, res: Response) => {
  try {
    const { name, size, color, price, available } = req.body;
    const newDress = new Dress({ name, size, color, price, available });
    const savedDress = await newDress.save();
    res.status(201).json(savedDress);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear vestido', error });
  }
};

// Actualizar vestido
export const updateDress = async (req: Request, res: Response) => {
  try {
    const updated = await Dress.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) return res.status(404).json({ message: 'Vestido no encontrado' });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar vestido', error });
  }
};

// Eliminar vestido
export const deleteDress = async (req: Request, res: Response) => {
  try {
    const deleted = await Dress.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Vestido no encontrado' });

    res.status(200).json({ message: 'Vestido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar vestido', error });
  }
};
