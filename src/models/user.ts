import client from '../database';

export type User = {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    const conn = await client.connect();
    const sql = 'SELECT * FROM users;';
    const result = await conn.query<User>(sql);

    conn.release();
    return result.rows;
  }

  async show(username: string): Promise<User> {
    const conn = await client.connect();
    const sql = 'SELECT * FROM users WHERE username = $1;';
    const result = await conn.query<User>(sql, [username]);

    conn.release();
    return result.rows[0];
  }

  async create(user: User): Promise<User> {
    const conn = await client.connect();
    const sql =
      'INSERT INTO users (username, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING id, username, firstname, lastname;';
    const result = await conn.query<User>(sql, [
      user.username,
      user.firstname,
      user.lastname,
      user.password
    ]);

    conn.release();
    return result.rows[0];
  }

  async update(user: User): Promise<User> {
    const conn = await client.connect();
    const sql =
      'UPDATE users SET firstname=$1, lastname=$2 WHERE id=$3 RETURNING id, username, firstname, lastname;';
    const result = await conn.query<User>(sql, [user.firstname, user.lastname, user.id]);

    conn.release();
    return result.rows[0];
  }

  async delete(id: number): Promise<User> {
    const conn = await client.connect();
    const sql = 'DELETE FROM users WHERE id=$1 RETURNING id, username, firstname, lastname;';
    const result = await conn.query<User>(sql, [id]);

    conn.release();
    return result.rows[0];
  }
}
