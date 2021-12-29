import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { Thing } from './model/Thing';

const dbConnexion = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('connexion réussie à la base de données');

    // await Thing.deleteMany();

    // const thing1 = Thing.build({
    //   title: 'object 1',
    //   description: 'description 1',
    //   imageUrl:
    //     'https://www.cdiscount.com/pdt2/0/b/k/1/300x300/nikcoolpixa10bk/rw/nikon-vna981e1-appareil-photo-compact-coolpix-a10.jpg',
    //   price: 50000,
    //   userId: 'userId1',
    // });

    // const thing2 = Thing.build({
    //   title: 'object2',
    //   description: 'description2',
    //   imageUrl: 'https://fr.shopping.rakuten.com/photo/1582875354_L.jpg',
    //   price: 55000,
    //   userId: 'userId2',
    // });

    // await thing1.save();
    // await thing2.save();
  } catch (error) {
    console.log(error);
  }
};

dbConnexion();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.get('/api/stuff', async (req, res, next) => {
  try {
    const things = await Thing.find();
    res.status(200).json(things);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.get('/api/stuff/:id', async (req, res, next) => {
  try {
    const thing = await Thing.findOne({ _id: req.params.id });
    res.status(200).json(thing);
  } catch (error) {
    res.status(404).json({ error });
  }
});

app.post('/api/stuff', async (req, res, next) => {
  const { title, description, imageUrl, price, userId } = req.body;
  const thing = Thing.build({ title, description, imageUrl, price, userId });
  try {
    await thing.save();
    res.status(201).json({ message: 'Objet enregistré !' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

export default app;
