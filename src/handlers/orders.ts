import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import validateToken from '../utilities/validate-token';

const store = new OrderStore();

const show = async (_req: Request, _res: Response) => {
  const userId = parseInt(_req.params.userId);
  try {
    const order = await store.show(userId);
    _res.json(order);
  } catch (error) {
    _res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

const create = async (_req: Request, _res: Response) => {
  try {
    const newOrder = await store.create(_req.body.order as Order);
    _res.json(newOrder);
  } catch (error) {
    _res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

const update = async (_req: Request, _res: Response) => {
  try {
    const updatedOrder = await store.update(_req.body.order as Order);
    _res.json(updatedOrder);
  } catch (error) {
    _res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

const remove = async (_req: Request, _res: Response) => {
  const id = parseInt(_req.params.orderId);
  try {
    const deletedOrder = await store.delete(id);
    _res.json(deletedOrder);
  } catch (error) {
    _res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

const order_routes = (_app: express.Application) => {
  _app.get('/:userId/orders', validateToken, show);
  _app.post('/:userId/orders', validateToken, create);
  _app.put('/:userId/orders/:orderId', validateToken, update);
  _app.delete('/:userId/orders/:orderId', validateToken, remove);
};

export default order_routes;
