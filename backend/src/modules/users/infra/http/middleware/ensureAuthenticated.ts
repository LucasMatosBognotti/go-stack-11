import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { secret } from '../../../../../config/auth';

import AppError from '../../../../../shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };

    next();
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
}
