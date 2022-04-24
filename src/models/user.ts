import client from "../database";
import bcrypt from "bcrypt";

export type User = {
    id?: number;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
}

export class UserStore {
    async index(): Promise<User[]> {
        const conn = await client.connect();
        const sql = 'SELECT * FROM users;';
        const result = await conn.query<User>(sql);

        return result.rows;
    }

    async show(username: string): Promise<User> {
        const conn = await client.connect();
        const sql = 'SELECT id, username, firstname, lastname FROM users WHERE username = $1;';
        const result = await conn.query<User>(sql, [username]);

        return result.rows[0];
    }

    async create(user: User): Promise<User> {
        const hashed = bcrypt.hashSync(user.password, 10)

        const conn = await client.connect();
        const sql = 'INSERT INTO users (username, firstname, lastname, password) VALUES ($1, $2, $3, $4) returning id, username, firstname, lastname;';
        const result = await conn.query<User>(sql, [user.username, user.firstname, user.lastname, hashed]);

        return result.rows[0];
    }
}