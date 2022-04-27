import supertest from 'supertest';
import { User } from '../../models/user';
import app from '../../server';

const request = supertest(app);

describe('User routes', () => {
  const newUser: User = {
    username: 'omar',
    firstname: 'Omar',
    lastname: 'Eldamiry',
    password: 'pass123'
  };
  // Token is set to a valid jwt token.
  let token: string = 'eyJhbGciOiJIUzI1NiJ9.bGFuY2Vy.F8Yw8uMHdaVXHjUVNwLRQ2jhu8rzzkDqqsLpzhxcagw';

  it('[GET] /users => should return an empty list', async () => {
    const response = await request.get('/users').set('Authorization', `Bearer ${token}`);
    expect(response.body).toEqual([]);
  });
  
  it('[POST] /signup => should add and return a new user', async () => {
    const response = await request.post('/signup').send({ user: newUser });
    newUser.id = response.body.id;
    expect(response.body.username).toBe(newUser.username);
  });

  it('[GET] /users/:id => should return a user', async () => {
    const response = await request.get(`/users/${newUser.id}`).set('Authorization', `Bearer ${token}`);
    expect(response.body.username).toEqual(newUser.username);
  })
  
  it('[POST] /login => should login to an existing user', async () => {
    const response = await request.post('/login').send({
      user: {
        username: newUser.username,
        password: newUser.password
      }
    });
    token = response.body.token;
    expect(response.body.token).toBeDefined();
  });

  it('[PUT] /users/:id => should update an existing user', async () => {
    const response = await request
      .put(`/users/${newUser.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        user: {
          id: newUser.id,
          username: 'omar',
          firstname: 'John',
          lastname: 'Doe',
          password: 'pass123'
        }
      });
    expect(response.body.firstname).toEqual('John');
  });

  it('[DELETE] /users/:id => should delete an existing user', async () => {
    const response = await request
      .delete(`/users/${newUser.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.username).toBe(newUser.username);
  });
});
