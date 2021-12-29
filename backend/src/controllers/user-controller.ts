import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { NotFoundError } from '../errors/not-found-error';
import User from '../model/User';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = User.build({ email: req.body.email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: 'utilisateur créé' });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const currentUser = await User.findOne({ email: req.body.email });
  if (!currentUser) {
    throw new NotFoundError();
  }
  const valid = await bcrypt.compare(req.body.password, currentUser.password);
  if (!valid) {
    throw new BadRequestError('invalid credentials');
  }
  res
    .status(200)
    .json({
      userId: currentUser._id,
      token: jwt.sign({ userId: currentUser._id }, 'RANDOM_TOKEN_SECRET', {
        expiresIn: '24h',
      }),
    });
};

export { signup, login };
