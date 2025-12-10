// src/controllers/rental.controller.ts
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Rental } from '../models/rental.model';
import { Client } from '../models/client.model';
import { Dress } from '../models/dress.model';

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
    const { clientId, dress, startDate, endDate, totalPrice } = req.body;

    // Validación de campos requeridos
    if (!clientId || !dress || !startDate || !endDate) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Buscar cliente
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }

    // Buscar vestido
    const selectedDress = await Dress.findById(dress);
    if (!selectedDress) {
      return res.status(404).json({ message: 'Vestido no encontrado.' });
    }

    if (!selectedDress.available) {
      return res.status(400).json({ message: 'El vestido no está disponible para renta.' });
    }

    // Validar fechas
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return res.status(400).json({ message: 'La fecha de inicio no puede ser posterior a la de término.' });
    }

    // --- VALIDACIÓN DE FECHAS EN EL PASADO ---
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      return res.status(400).json({ message: 'La fecha de inicio no puede estar en el pasado.' });
    }

    if (end < today) {
      return res.status(400).json({ message: 'La fecha de término no puede estar en el pasado.' });
    }

    // Precio personalizado o el fijo del vestido
    const finalPrice = totalPrice ?? selectedDress.rentalPrice;

    const newRental = new Rental({
      clientId: client._id,
      clientName: client.fullName,
      clientEmail: client.email,
      clientPhone: client.phone,
      dress: selectedDress._id,
      startDate: start,
      endDate: end,
      totalPrice: finalPrice,
      status: 'active'
    });

    const savedRental = await newRental.save();

    // Marcar vestido como no disponible
    selectedDress.available = false;
    await selectedDress.save();

    res.status(201).json(savedRental);
  } catch (error) {
    console.error('Error al crear renta:', error);
    res.status(500).json({ message: 'Error al crear la renta', error });
  }
};


// Actualizar renta
export const updateRental = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, status, dress, totalPrice } = req.body;

    const rental = await Rental.findById(id);
    if (!rental) {
      return res.status(404).json({ message: 'Renta no encontrada.' });
    }

    // --- VALIDACIÓN Y ACTUALIZACIÓN DE FECHAS ---
    let start = rental.startDate;
    let end = rental.endDate;

    if (startDate) start = new Date(startDate);
    if (endDate) end = new Date(endDate);

    if (start > end) {
      return res.status(400).json({ message: 'La fecha de inicio no puede ser posterior a la de término.' });
    }

    // --- VALIDACIÓN: NO PERMITIR FECHAS EN EL PASADO ---
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      return res.status(400).json({ message: 'La fecha de inicio no puede estar en el pasado.' });
    }

    if (end < today) {
      return res.status(400).json({ message: 'La fecha de término no puede estar en el pasado.' });
    }

    let currentDress = await Dress.findById(rental.dress);

    // --- SI CAMBIA EL VESTIDO ---
    if (dress && dress !== rental.dress.toString()) {
      const newDress = await Dress.findById(dress);
      if (!newDress || !newDress.available) {
        return res.status(400).json({ message: 'El nuevo vestido no está disponible o no existe.' });
      }

      // Liberar vestido anterior
      if (currentDress) {
        currentDress.available = true;
        await currentDress.save();
      }

      // Asignar nuevo vestido
      rental.dress = newDress._id as mongoose.Types.ObjectId;
      currentDress = newDress;

      newDress.available = false;
      await newDress.save();
    }

    // --- ACTUALIZAR PRECIO SOLO SI SE ENVÍA ---
    if (totalPrice !== undefined) {
      rental.totalPrice = totalPrice;
    }

    // --- ACTUALIZAR ESTADO Y FECHAS ---
    rental.startDate = start;
    rental.endDate = end;
    rental.status = status || rental.status;

    // Si se completa o cancela la renta → liberar vestido
    if (status === 'completed' || status === 'cancelled') {
      const rentedDress = await Dress.findById(rental.dress);
      if (rentedDress && !rentedDress.available) {
        rentedDress.available = true;
        await rentedDress.save();
      }
    }

    const updatedRental = await rental.save();
    res.status(200).json(updatedRental);

  } catch (error) {
    console.error('Error al actualizar renta:', error);
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
