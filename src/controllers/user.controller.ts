// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';




// GET /api/users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: err });
  }
};

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar usuario', error: err });
  }
};

// POST /api/users
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    // Validar que los campos existan
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Verificar si el usuario o email ya existen
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'El usuario o email ya existen' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    const savedUser = await newUser.save();

    // Evitar enviar la contraseña al cliente
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json(userWithoutPassword);
  } catch (err) {
    console.error('Error al crear usuario:', err);
    res.status(500).json({ message: 'Error al crear usuario', error: err });
  }
};


// PUT /api/users/:id
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar usuario', error: err });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar usuario', error: err });
  }
};
