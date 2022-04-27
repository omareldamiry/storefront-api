import supertest from 'supertest';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import app from '../../server';

const request = supertest(app);

describe('Product routes', () => {
  const product: Product = { name: 'Washing Machine', price: 700, category: 'Home Appliances' };
  const user: User = {
    username: 'omar',
    firstname: 'Omar',
    lastname: 'Eldamiry',
    password: 'pass123'
  };
  let token: string;

  beforeAll(async () => {
    const signupResponse = await request.post('/signup').send({ user: user });
    user.id = signupResponse.body.id;

    const loginResponse = await request.post('/login').send({
      user: {
        username: 'omar',
        password: 'pass123'
      }
    });

    token = loginResponse.body.token;
  });

  it('[GET] /products => should return an empty list', async () => {
    const response = await request.get('/products');
    expect(response.body).toEqual([]);
  });

  it('[POST] /products => should add and return a new product', async () => {
    const response = await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ product: product });
    product.id = response.body.id;

    expect(response.body.id).toEqual(1);
  });

  it('[GET] /products/:id => should return a product from id', async () => {
    const response = await request.get('/products/1');
    expect(response.body.id).toEqual(1);
  });

  it('[PUT] /products/:id => should update an existing product', async () => {
    const response = await request
      .put('/products/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        product: {
          id: product.id,
          name: 'Fridge',
          price: 1200,
          category: product.category
        }
      });

    expect(response.body.name).toEqual('Fridge');
  });

  it('[DELETE] /products/:id => should delete an existing product', async () => {
    const response = await request.delete('/products/1').set('Authorization', `Bearer ${token}`);
    expect(response.body.id).toEqual(1);
  });

  afterAll(async () => {
    await request.delete(`/users/${user.id}`).set('Authorization', `Bearer ${token}`);
  });
});
