import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { User, UserStore } from '../models/user';
import validateToken from '../utilities/validate-token';

const store = new UserStore();
const jwt = jsonwebtoken;

const index = async (_req: Request, _res: Response) => {
  try {
    const users = await store.index();
    _res.json(users);
  } catch (error) {
    _res.status(500).json({ message: 'Internal Server Error: Failed to Fetch Users' });

  }
};

const login = async (_req: Request, _res: Response) => {
  try {
    const user = await store.show(_req.body.user.username);
    const secret = process.env.SECRET || 'secret';
    const isCorrectPassword = bcrypt.compareSync(_req.body.user.password + secret, user.password);

    if (isCorrectPassword) {
      const token = jwt.sign(user, secret);

      _res.json({
        token: token,
        user: {
          id: user.id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname
        }
      });
    } else {
      _res.json({ message: 'Incorrect password' });
    }
  } catch (error) {
    _res.status(500).json({ message: 'Internal Server Error: Failed to Login User' });
  }
};

const signup = async (_req: Request, _res: Response) => {
  const salt = parseInt(process.env.SALT || '10');
  const pepper = process.env.SECRET;
  _req.body.user.password = bcrypt.hashSync(_req.body.user.password + pepper, salt);
  try {
    const newUser = await store.create(_req.body.user as User);
    _res.json(newUser);
  } catch (error) {
    _res.status(500).json({ message: 'Internal Server Error: Failed to Signup User' });
  }
};

const update = async (_req: Request, _res: Response) => {
  // const id = parseInt(_req.params.id);
  try {
    const updatedUser = await store.update(_req.body.user as User);
    _res.json(updatedUser);
  } catch (error) {
    _res.status(500).json({ message: 'Internal Server Error: Failed to Update User' });
  }
};

const remove = async (_req: Request, _res: Response) => {
  const id = parseInt(_req.params.id);
  try {
    const deletedUser = await store.delete(id);
    _res.json(deletedUser);
  } catch (error) {
    _res.status(500).json({ message: 'Internal Server Error: Failed to Delete User' });
  }
};

const user_routes = (_app: express.Application) => {
  _app.get('/users', validateToken, index);
  _app.post('/login', login);
  _app.post('/signup', signup);
  _app.put('/users/:id', validateToken, update);
  _app.delete('/users/:id', validateToken, remove);
};

export default user_routes;
