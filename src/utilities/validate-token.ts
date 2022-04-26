import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = async (_req: Request, _res: Response, next: NextFunction) => {
  const token = _req.header('Authorization')?.split(' ')[1];
  if (token) {
    try {
      jwt.verify(token, process.env.SECRET || 'secret');
    } catch (error) {
      _res.status(401).json({
        message: 'Unauthorized access'
      });

      return;
    }

    next();
  } else {
    _res.status(401).json({
      message: 'Unauthorized access'
    });
  }
};

export default validateToken;
