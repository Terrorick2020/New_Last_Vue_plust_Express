import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    password: 'bkmz2020QWE',
    host: '127.0.0.1',
    port: 5432,
    database: 'books_service'
});

export { pool };