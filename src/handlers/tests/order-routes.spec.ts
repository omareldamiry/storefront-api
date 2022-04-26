import supertest from 'supertest';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import app from '../../server';

const request = supertest(app);

describe('Order routes', () => {
  const user: User = {
    username: 'omar',
    firstname: 'Omar',
    lastname: 'Eldamiry',
    password: 'pass123'
  };
  const order: Order = {
    product_ids: [],
    product_quantities: [],
    status: 'active',
    user_id: 0
  };
  let token: string;

  beforeAll(async () => {
    const signupResponse = await request.post('/signup').send({ user: user });
    user.id = signupResponse.body.id;
    order.user_id = user.id || 0;

    const loginResponse = await request.post('/login').send({
      user: {
        username: 'omar',
        password: 'pass123'
      }
    });

    token = loginResponse.body.token;
  });

  it('should return an empty list', async () => {
    const response = await request
      .get(`/${user.id}/orders`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toEqual([]);
  });

  it('should create a new order', async () => {
    const response = await request
      .post(`/${user.id}/orders`)
      .set('Authorization', `Bearer ${token}`)
      .send({ order: order });
    order.id = response.body.id;

    expect(response.body.id).toEqual(1);
  });

  it('should update existing orders', async () => {
    const response = await request
      .put(`/${user.id}/orders/${order.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        order: {
          id: order.id,
          status: 'complete',
          product_ids: order.product_ids,
          product_quantities: order.product_quantities,
          user_id: order.user_id
        }
      });

    expect(response.body.status).toEqual('complete');
  });

  it('should delete an existing order', async () => {
    const response = await request
      .delete(`/${user.id}/orders/${order.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.id).toEqual(order.id);
  });

  afterAll(async () => {
    await request.delete(`/users/${user.id}`).set('Authorization', `Bearer ${token}`);
  });
});
