import client from '../database';

export type Order = {
  id?: number;
  product_ids: number[];
  product_quantities: number[];
  user_id: number;
  status: 'active' | 'complete';
};

export class OrderStore {
  async show(userId: number): Promise<Order[]> {
    const conn = await client.connect();
    const sql = 'SELECT * FROM orders WHERE user_id = $1;';
    const result = await conn.query<Order>(sql, [userId]);

    conn.release();
    return result.rows;
  }

  async create(order: Order): Promise<Order> {
    const conn = await client.connect();
    const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;';
    const result = await conn.query<Order>(sql, [order.status, order.user_id]);

    conn.release();
    return result.rows[0];
  }

  async update(order: Order): Promise<Order> {
    const conn = await client.connect();
    const sql = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *;';
    const result = await conn.query<Order>(sql, [order.status, order.id]);

    conn.release();
    return result.rows[0];
  }

  async delete(id: number): Promise<Order> {
    const conn = await client.connect();
    const sql = 'DELETE FROM orders WHERE id=$1 RETURNING *;';
    const result = await conn.query<Order>(sql, [id]);

    conn.release();
    return result.rows[0];
  }
}
