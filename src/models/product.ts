import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    const conn = await client.connect();
    const sql = 'SELECT * FROM products;';
    const result = await conn.query<Product>(sql);

    conn.release();
    return result.rows;
  }

  async show(id: number): Promise<Product> {
    const conn = await client.connect();
    const sql = 'SELECT * FROM products where id = $1;';
    const result = await conn.query<Product>(sql, [id]);

    conn.release();
    return result.rows[0];
  }

  async create(product: Product): Promise<Product> {
    const conn = await client.connect();
    const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *;';
    const result = await conn.query<Product>(sql, [product.name, product.price, product.category]);

    conn.release();
    return result.rows[0];
  }

  async update(product: Product): Promise<Product> {
    const conn = await client.connect();
    const sql = 'UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING *;';
    const result = await conn.query<Product>(sql, [
      product.name,
      product.price,
      product.category,
      product.id
    ]);

    conn.release();
    return result.rows[0];
  }

  async delete(id: number): Promise<Product> {
    const conn = await client.connect();
    const sql = 'DELETE FROM products WHERE id=$1 RETURNING *;';
    const result = await conn.query<Product>(sql, [id]);

    conn.release();
    return result.rows[0];
  }
}
