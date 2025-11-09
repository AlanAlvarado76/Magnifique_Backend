// src/controllers/rental.controller.ts
import { Request, Response } from 'express';
import { Rental } from '../models/rental.model';

// Obtener todas las rentas
export const getAllRentals = async (_req: Request, res: Response) => {
  try {
    const rentals = await Rental.find().populate('dress');
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener rentas', error });
  }
};

// Obtener renta por ID
export const getRentalById = async (req: Request, res: Response) => {
  try {
    const rental = await Rental.findById(req.params.id).populate('dress');
    if (!rental) return res.status(404).json({ message: 'Renta no encontrada' });
    res.status(200).json(rental);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener renta', error });
  }
};

// Crear una nueva renta
export const createRental = async (req: Request, res: Response) => {
  try {
    const rental = new Rental(req.body);
    const savedRental = await rental.save();
    res.status(201).json(savedRental);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear renta', error });
  }
};

// Actualizar renta
export const updateRental = async (req: Request, res: Response) => {
  try {
    const updated = await Rental.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Renta no encontrada' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar renta', error });
  }
};

// Eliminar renta
export const deleteRental = async (req: Request, res: Response) => {
  try {
    const deleted = await Rental.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Renta no encontrada' });
    res.status(200).json({ message: 'Renta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar renta', error });
  }
};
