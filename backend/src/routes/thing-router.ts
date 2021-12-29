import express from 'express';
import {
  createThing,
  deleteThing,
  getAllThings,
  getOneThing,
  updateThing,
} from '../controllers/thing-controller';
import { requireAuth } from '../middlewares/require-auth';

const thingRouter = express.Router();

thingRouter.post('/', requireAuth, createThing);
thingRouter.get('/', requireAuth, getAllThings);
thingRouter.get('/:id', requireAuth, getOneThing);
thingRouter.put('/:id', requireAuth, updateThing);
thingRouter.delete('/:id', requireAuth, deleteThing);

export default thingRouter;
