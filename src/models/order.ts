import client from '../database';

export type Order = {
  id?: number;
  product_ids: number[];
  product_quantities: number[];
  user_id: number;
  status: 'active' | 'complete';
};

export type OrderProduct = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderStore {
  async show(userId: number): Promise<Order[]> {
    const conn = await client.connect();
    const orderSql = 'SELECT * FROM orders WHERE user_id = $1;';
    const productSql = 'SELECT * FROM order_products WHERE order_id = $1;';
    const orderResult = await conn.query<Order>(orderSql, [userId]);

    orderResult.rows.map(async (order) => {
      const productResult = await conn.query<OrderProduct>(productSql, [order.id]);
      productResult.rows.forEach((product) => {
        order.product_ids.push(product.id);
        order.product_quantities.push(product.quantity);
      });
    });

    conn.release();
    return orderResult.rows;
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
    const orderSql = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *;';
    const orderResult = await conn.query<Order>(orderSql, [order.status, order.id]);

    conn.release();
    return orderResult.rows[0];
  }

  async addProduct(orderProduct: OrderProduct): Promise<OrderProduct> {
    const conn = await client.connect();
    const sql =
      'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *;';
    const result = await conn.query<OrderProduct>(sql, [
      orderProduct.order_id,
      orderProduct.product_id,
      orderProduct.quantity
    ]);

    conn.release();
    return result.rows[0];
  }

  async delete(id: number): Promise<Order> {
    const conn = await client.connect();
    const orderSql = 'DELETE FROM orders WHERE id=$1 RETURNING *;';
    const productSql = 'DELETE FROM order_products WHERE order_id=$1;';
    const result = await conn.query<Order>(orderSql, [id]);

    await conn.query(productSql, [result.rows[0].id]);

    conn.release();
    return result.rows[0];
  }
}
