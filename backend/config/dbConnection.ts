import { Pool } from 'pg';

export default {
    connectToPostgresDB: async (poolConfig: object) => {
        try {
            const pool = new Pool(poolConfig);
            const client = await pool.connect();
            const result = await client.query('SELECT 1');
            client.release();

            if (result.rows[0] && result.rows[0]['?column?'] === 1) {
                console.log('Успешное подключение к БД: PostgreSQL. Пул соединений успешно создан.');
            } else {
                console.log('Возникла ошибка при создании пула');
            }

            return pool;
        } catch (error) {
            console.error('Возникла ошибка при подключении к БД: PostgreSQL');
            console.error(error);
            return null;
        }
    }
};
