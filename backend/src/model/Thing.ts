import mongoose from 'mongoose';

interface ThingAttrs {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  userId: string;
}

interface ThingDoc extends mongoose.Document {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  userId: string;
}

interface ThingModel extends mongoose.Model<ThingDoc> {
  build(attrs: ThingAttrs): ThingDoc;
}

const ThingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

ThingSchema.statics.build = (attrs: ThingAttrs) => {
  return new Thing(attrs);
};

const Thing = mongoose.model<ThingDoc, ThingModel>('Thing', ThingSchema);

export default Thing;
