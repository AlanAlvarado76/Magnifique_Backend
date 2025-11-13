// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';

//Obtener todos los usuarios
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: err });
  }
};

//Obtener usuario por Id 
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

//Crear Usuario
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    // Validaciones mínimas
    if (!username || username.length < 3) {
      return res.status(400).json({ message: 'El nombre de usuario es obligatorio y debe tener al menos 3 caracteres.' });
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'El correo electrónico no es válido.' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    // Verificar si ya existe el usuario
    const existing = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existing) {
      return res.status(400).json({ message: 'El nombre de usuario o correo ya están registrados.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'User'
    });

    const savedUser = await newUser.save();

    // No enviamos la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json(userWithoutPassword);
  } catch (error: any) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear usuario', error });
  }
};

//Actualizar Usuario
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;
    const { id } = req.params;

    // Verificar si el usuario existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Validar nuevo username (si se envía)
    if (username && username.length < 3) {
      return res.status(400).json({ message: 'El nombre de usuario debe tener al menos 3 caracteres.' });
    }

    // Validar email (si se envía)
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Correo electrónico no válido.' });
    }

    // Validar contraseña (si se envía)
    let hashedPassword = user.password;
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres.' });
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Validar duplicados si cambia username o email
    if ((username && username !== user.username) || (email && email !== user.email)) {
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
        _id: { $ne: id } // excluir al usuario actual
      });

      if (existingUser) {
        return res.status(400).json({ message: 'El nombre de usuario o correo ya están registrados por otro usuario.' });
      }
    }

    // Aplicar actualizaciones
    user.username = username ?? user.username;
    user.email = email ?? user.email;
    user.password = hashedPassword;
    user.role = role ?? user.role;

    const updatedUser = await user.save();

    const { password: _, ...userWithoutPassword } = updatedUser.toObject();

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario', error });
  }
};


// Borrar Usuarios 
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
