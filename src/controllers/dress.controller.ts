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

//Filtrar vestidos por Marca, Talla, coleccion, proveedor y disponibilidad
export const getFilteredDresses = async (req: Request, res: Response) => {
  try {
    const {
      size,
      brand,
      collectionDress,
      supplier,
      available
    } = req.query;

    // Construye el filtro dinámicamente
    const filter: any = {};

    if (size) filter.size = size;
    if (brand) filter.brand = brand;
    if (collectionDress) filter.collectionDress = collectionDress;
    if (supplier) filter.supplier = supplier;
    if (available !== undefined) filter.available = available === 'true';

    const dresses = await Dress.find(filter);
    res.status(200).json(dresses);
  } catch (error) {
    console.error('Error al filtrar vestidos:', error);
    res.status(500).json({ message: 'Error al obtener vestidos', error });
  }
};

// Crear vestido
export const createDress = async (req: Request, res: Response) => {
  try {
    const {
      name,
      size,
      color,
      brand,
      collectionDress,
      purchasePrice,
      salePrice,
      rentalPrice,
      supplier,
      available
    } = req.body;

    // Validación de campos requeridos
    if (
      !name || !size || !color || !brand || !collectionDress ||
      purchasePrice == null || salePrice == null || rentalPrice == null || !supplier
    ) {
      return res.status(400).json({ message: 'Faltan campos obligatorios.' });
    }

    // Validación de tamaños válidos
    const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    if (!validSizes.includes(size)) {
      return res.status(400).json({ message: 'Talla no válida. Usa XS, S, M, L, XL o XXL.' });
    }

    // Validación lógica de precios
    if (purchasePrice > salePrice) {
      return res.status(400).json({
        message: 'El precio de adquisición no puede ser mayor que el precio de venta.'
      });
    }

    if (rentalPrice > salePrice) {
      return res.status(400).json({
        message: 'El precio de renta no puede ser mayor que el precio de venta.'
      });
    }

    const newDress = new Dress({
      name,
      size,
      color,
      brand,
      collectionDress,
      purchasePrice,
      salePrice,
      rentalPrice,
      supplier,
      available
    });

    const savedDress = await newDress.save();
    res.status(201).json(savedDress);
  } catch (error) {
    console.error('Error al crear vestido:', error);
    res.status(500).json({ message: 'Error al crear vestido', error });
  }
};


//Actualizar vestido
export const updateDress = async (req: Request, res: Response) => {
  try {
    const {
      name,
      size,
      color,
      brand,
      collectionDress,
      purchasePrice,
      salePrice,
      rentalPrice,
      supplier,
      available
    } = req.body;

    // Validaciones lógicas opcionales si esos campos vienen
    if (purchasePrice != null && salePrice != null && purchasePrice > salePrice) {
      return res.status(400).json({
        message: 'El precio de adquisición no puede ser mayor que el precio de venta.'
      });
    }

    if (rentalPrice != null && salePrice != null && rentalPrice > salePrice) {
      return res.status(400).json({
        message: 'El precio de renta no puede ser mayor que el precio de venta.'
      });
    }

    // Validación de talla (si viene en la actualización)
    const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    if (size && !validSizes.includes(size)) {
      return res.status(400).json({ message: 'Talla no válida. Usa XS, S, M, L, XL o XXL.' });
    }

    const updatedDress = await Dress.findByIdAndUpdate(
      req.params.id,
      {
        name,
        size,
        color,
        brand,
        collectionDress,
        purchasePrice,
        salePrice,
        rentalPrice,
        supplier,
        available
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedDress) {
      return res.status(404).json({ message: 'Vestido no encontrado' });
    }

    res.status(200).json(updatedDress);
  } catch (error) {
    console.error('Error al actualizar vestido:', error);
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
