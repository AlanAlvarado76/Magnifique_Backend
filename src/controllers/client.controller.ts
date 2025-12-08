import { Request, Response } from "express";
import { Client } from "../models/client.model";

//  Obtener todos los clientes
export const getAllClients = async (_req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener clientes", error });
  }
};

//  Obtener un cliente por ID
export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener cliente", error });
  }
};

//  Crear un nuevo cliente
export const createClient = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      phone,
      email,
      address,
      city,
      state,
      postalCode,
      birthDate
    } = req.body;

    // Validación mínima de campos
    if (
      !fullName ||
      !phone ||
      !email ||
      !address ||
      !city ||
      !state ||
      !postalCode ||
      !birthDate
    ) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Validación de fecha de nacimiento
    const parsedDate = new Date(birthDate);
    const today = new Date();
    const minDate = new Date('1900-01-01');

    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: 'La fecha de nacimiento no es válida.' });
    }

    if (parsedDate > today) {
      return res.status(400).json({ message: 'La fecha de nacimiento no puede ser en el futuro.' });
    }

    if (parsedDate < minDate) {
      return res.status(400).json({ message: 'La fecha de nacimiento es demasiado antigua.' });
    }

    // Validación de edad mínima (18 años)
    const ageDiffMs = today.getTime() - parsedDate.getTime();
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age < 18) {
      return res.status(400).json({ message: 'El cliente debe tener al menos 18 años.' });
    }

    // Verificar email duplicado
    const existing = await Client.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'El correo ya está registrado por otro cliente.' });
    }

    const newClient = new Client({
      fullName,
      phone,
      email,
      address,
      city,
      state,
      postalCode,
      birthDate: parsedDate
    });

    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear cliente', error });
  }
};



//  Actualizar un cliente
export const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    // Verificar si existe el cliente
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Validar duplicado si se cambia el correo
    if (email && email !== client.email) {
      const existing = await Client.findOne({ email });
      if (existing) {
        return res
          .status(400)
          .json({ message: "El correo ya está registrado por otro cliente." });
      }
    }

    const updated = await Client.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar cliente", error });
  }
};

// Eliminar cliente
export const deleteClient = async (req: Request, res: Response) => {
  try {
    const deleted = await Client.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar cliente", error });
  }
};
