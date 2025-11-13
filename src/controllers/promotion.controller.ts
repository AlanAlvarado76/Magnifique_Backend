import { Request, Response } from 'express';
import { Promotion } from '../models/promotion.model';

//  Obtener todas las promociones
export const getAllPromotions = async (_req: Request, res: Response) => {
  try {
    const promotions = await Promotion.find();
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener promociones', error });
  }
};

//  Obtener promoción por ID
export const getPromotionById = async (req: Request, res: Response) => {
  try {
    const promo = await Promotion.findById(req.params.id);
    if (!promo) {
      return res.status(404).json({ message: 'Promoción no encontrada' });
    }
    res.status(200).json(promo);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener promoción', error });
  }
};

//  Crear nueva promoción
export const createPromotion = async (req: Request, res: Response) => {
  try {
    const { title, startDate, endDate, description, status } = req.body;

    // Validación mínima de campos
    if (!title || !startDate || !endDate || !description) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    //  Validar que startDate no sea después de endDate
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return res.status(400).json({
        message: 'La fecha de inicio no puede ser posterior a la fecha de término.'
      });
    }

    const newPromotion = new Promotion({
      title,
      startDate: start,
      endDate: end,
      description,
      status: status || 'Activa'
    });

    const savedPromotion = await newPromotion.save();
    res.status(201).json(savedPromotion);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear promoción', error });
  }
};


//  Actualizar promoción

export const updatePromotion = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.body;

    // Validar que la promoción exista
    const promo = await Promotion.findById(req.params.id);
    if (!promo) {
      return res.status(404).json({ message: 'Promoción no encontrada' });
    }

    // Validación de fechas si ambas están presentes
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        return res.status(400).json({
          message: 'La fecha de inicio no puede ser posterior a la fecha de término.'
        });
      }
    }

    const updated = await Promotion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json(updated);
  } catch (error) {
    console.error('Error al actualizar promoción:', error);
    res.status(500).json({ message: 'Error al actualizar promoción', error });
  }
};


//  Eliminar promoción
export const deletePromotion = async (req: Request, res: Response) => {
  try {
    const deleted = await Promotion.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Promoción no encontrada' });
    }

    res.status(200).json({ message: 'Promoción eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar promoción', error });
  }
};
