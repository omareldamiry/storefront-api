import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import validateToken from '../utilities/validate-token';

const store = new ProductStore();

const index = async (_req: Request, _res: Response) => {
  try {
    const products = await store.index();
    _res.json(products);
  } catch (error) {
    _res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

const show = async (_req: Request, _res: Response) => {
  try {
    const product = await store.show(parseInt(_req.params.id));
    _res.json(product);
  } catch (error) {
    _res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

const create = async (_req: Request, _res: Response) => {
  try {
    const newProduct = await store.create(_req.body.product as Product);
    _res.json(newProduct);
  } catch (error) {
    _res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

const update = async (_req: Request, _res: Response) => {
  try {
    const updatedProduct = await store.update(_req.body.product as Product);
    _res.json(updatedProduct);
  } catch (error) {
    _res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

const remove = async (_req: Request, _res: Response) => {
  const id = parseInt(_req.params.id);
  try {
    const deletedProduct = await store.delete(id);
    _res.json(deletedProduct);
  } catch (error) {
    _res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

const product_routes = (_app: express.Application) => {
  _app.get('/products', index);
  _app.get('/products/:id', show);
  _app.post('/products', validateToken, create);
  _app.put('/products/:id', validateToken, update);
  _app.delete('/products/:id', validateToken, remove);
};

export default product_routes;
