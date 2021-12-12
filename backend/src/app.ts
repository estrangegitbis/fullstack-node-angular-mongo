import express from 'express';
import { Thing } from './model/Thing';

const app = express();

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

app.use('/api/stuff', (req, res, next) => {
  const stuff = [
    new Thing(
      '1',
      'object 1',
      'description 1',
      'https://www.cdiscount.com/pdt2/0/b/k/1/300x300/nikcoolpixa10bk/rw/nikon-vna981e1-appareil-photo-compact-coolpix-a10.jpg',
      50000,
      'userId1'
    ),
    new Thing(
      '2',
      'object2',
      'description2',
      'https://fr.shopping.rakuten.com/photo/1582875354_L.jpg',
      55000,
      'userId2'
    ),
  ];
  res.status(200).json(stuff);
});

export default app;
