import client from "../database";

export type Order = {
    id?: number;
    idOfProducts: number[];
    quantityOfProducts: number[];
    userId: number;
    status: "active" | "complete"
}

export class OrderStore {
    async show(userId: number): Promise<Order> {
        const conn = await client.connect();
        const sql = 'SELECT * FROM orders WHERE user_id = $1;';
        const result = await conn.query<Order>(sql, [userId]);

        return result.rows[0];
    }
}