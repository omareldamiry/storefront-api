import client from '../database';
import * as bcrypt from 'bcrypt';

export type User = {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users;';
      const result = await conn.query<User>(sql);

      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error('Could not fetch users');
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id = $1;';
      const result = await conn.query<User>(sql, [id]);

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error('Could not fetch user');
    }
  }

  async login(username: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE username = $1;';
      const result = await conn.query<User>(sql, [username]);

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error('Could not fetch user');
    }
  }

  async create(user: User): Promise<User> {
    const salt = parseInt(process.env.SALT || '10');
    const pepper = process.env.SECRET;
    const hashed = bcrypt.hashSync(user.password + pepper, salt);

    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (username, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING id, username, firstname, lastname;';
      const result = await conn.query<User>(sql, [
        user.username,
        user.firstname,
        user.lastname,
        hashed
      ]);

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error('Could not create user');
    }
  }

  async update(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'UPDATE users SET firstname=$1, lastname=$2 WHERE id=$3 RETURNING id, username, firstname, lastname;';
      const result = await conn.query<User>(sql, [user.firstname, user.lastname, user.id]);

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error('Could not update user');
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE id=$1 RETURNING id, username, firstname, lastname;';
      const result = await conn.query<User>(sql, [id]);

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error('Could not delete user');
    }
  }
}
