import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { CustomError } from '../errors/custom-error';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new NotAuthorizedError('missing authorization header');
    }
    const token = authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken['userId'];
    req['auth'] = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw new NotAuthorizedError('unauthorized request');
    } else {
      next();
    }
  } catch (error) {
    if (error instanceof CustomError) {
      throw new BadRequestError(error.message);
    } else {
      throw new BadRequestError('invalid request');
    }
  }
};
