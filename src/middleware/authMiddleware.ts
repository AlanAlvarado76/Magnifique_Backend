import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '@AAMA050301HDGLRLA8';

interface DecodedUser {
  id: string;
  username: string;
  role: string;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === 'string') {
      return res.status(403).json({ message: 'Token inválido (string)' });
    }

    // Forzamos el tipo esperado
    const user = decoded as DecodedUser;

    req.user = {
      id: user.id,
      username: user.username,
      role: user.role
    };

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};
