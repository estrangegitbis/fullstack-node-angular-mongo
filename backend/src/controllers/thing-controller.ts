import { Request, Response } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { NotFoundError } from '../errors/not-found-error';
import Thing from '../model/thing';

const createThing = async (req: Request, res: Response) => {
  const { title, description, imageUrl, price, userId } = req.body;
  const thing = Thing.build({ title, description, imageUrl, price, userId });
  await thing.save();
  res.status(201).json({ message: 'Post saved successfully' });
};

const getAllThings = async (req: Request, res: Response) => {
  const things = await Thing.find();
  res.status(200).json(things);
};

const getOneThing = async (req: Request, res: Response) => {
  const thing = await Thing.findOne({ _id: req.params.id });
  res.status(200).json(thing);
};

const updateThing = async (req: Request, res: Response) => {
  const existingThing = await Thing.findById(req.params.id);
  if (!existingThing) {
    throw new NotFoundError();
  }
  const { title, description, imageUrl, price, userId } = req.body;
  existingThing.set({ title, description, imageUrl, price, userId });
  await existingThing.save();
  res.status(201).json({ message: 'Thing updated successfully!' });
};

const deleteThing = async (req: Request, res: Response) => {
  const existingThing = await Thing.findById(req.params.id);
  if (!existingThing) {
    throw new NotFoundError();
  }
  if (existingThing.userId != req['auth'].userId) {
    throw new NotAuthorizedError('unauthorized request');
  }
  await Thing.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: 'Deleted!' });
};

export { createThing, getAllThings, getOneThing, updateThing, deleteThing };
