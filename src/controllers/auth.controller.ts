// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    // Buscar por email o username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Crear token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error en login', error });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Sesión cerrada correctamente."
  });
};