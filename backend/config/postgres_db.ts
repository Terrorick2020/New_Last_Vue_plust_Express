import { Pool } from 'pg';
import bcrypt from 'bcrypt';

export default {
    connect_to_postgres_db: async (poolConfig: object) => {
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
    },

    identify_user: async (pool: Pool, userData: { schema: string, login: string, password: string }) => {
        try {
            const queryText = `SELECT id, password, role FROM ${userData.schema} WHERE login=$1`;
            const values = [userData.login];
            const res = await pool.query(queryText, values);
        
            if (res && res.rowCount && res.rowCount > 0) {
              const user = res.rows[0];
              const isPasswordValid = await bcrypt.compare(userData.password, user.password);
              
              if (isPasswordValid) {
                // console.log({ id: user.id, role: user.role });
                return { id: user.id, role: user.role };  
              } else {
                return false; 
              }
            } else {
              return false; 
            }
          } catch (error) {
            console.error('Возникла ошибка при работе с БД: PostgreSQL');
            console.error(error);
            return false; 
        }
    },
    add_user: async (pool: Pool, userData: { schema: string, login: string, email: string, password: string, role: Array<String> }) => {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const queryText = `INSERT INTO ${userData.schema} (login, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`;
            const values = [userData.login, userData.email, hashedPassword, userData.role];
            const res = await pool.query(queryText, values);

            if (res.rows.length > 0) {
                return {
                    result: 'success',
                    data: res.rows[0]
                };
            } else {
                return {
                    result: 'error',
                    code: 'failed_insert_user'
                };
            }
        } catch (error: any) {
            if (error.code === '23505') { 
                return {
                    code: error.code,
                    duplicate_field: error.detail.includes('login') ? 'login' : error.detail.includes('email') ? 'email' : 'undefined'
                };
            } else {
                console.error('Возникла ошибка при работе с БД: PostgreSQL');
                console.error(error);
                return {result: 'error'};
            }
        }
    },

    add_book: async (pool: Pool, bookData: { schema: string, title: string, publication: string, year: number, author_name: string, description: string, user_id: number }) => { 
        try {
            const queryText = `INSERT INTO ${bookData.schema} (title, publication, year, author_name, description, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
            const values = [bookData.title, bookData.publication, bookData.year, bookData.author_name, bookData.description, bookData.user_id];
            const res = await pool.query(queryText, values);

            if (res.rows.length > 0) {
                return {
                    result: 'success',
                    data: res.rows[0]
                };
            } else {
                return {
                    result: 'error',
                    code: 'failed_insert_book'
                };
            }
        } catch (error) {
            console.error('Возникла ошибка при работе с БД: PostgreSQL');
            console.error(error);
            return {result: 'error'};
        }
    },

    delete_book: async (pool: Pool, bookData: { schema: string, id: number }) => {
        try {
            const queryText = `DELETE FROM ${bookData.schema} WHERE id = $1 RETURNING *`;
            const values = [bookData.id];
            const res = await pool.query(queryText, values);
    
            // Check if res is not null and res.rowCount is greater than 0
            if (res && res.rowCount && res.rowCount > 0) {
                return {
                    result: 'success',
                    data: res.rows[0]
                };
            } else {
                return {
                    result: 'error',
                    code: 'failed_delete_book'
                };
            }
        } catch (error) {
            console.error('Возникла ошибка при работе с БД: PostgreSQL');
            console.error(error);
            return {result: 'error'};
        }
    },

    update_book: async (pool: Pool, bookId: number, updates: { [key: string]: any }) => {
        try {
            const keys = Object.keys(updates);
            const values = Object.values(updates);
            values.push(bookId); 
    
            const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    
            const queryText = `UPDATE books SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
    
            const res = await pool.query(queryText, values);
     
            if (res.rows.length > 0) {
                return {
                    result: 'success',
                    data: res.rows[0]
                };
            } else {
                return {
                    result: 'error',
                    code: 'failed_update_book'
                };
            }
        } catch (error) {
            console.error('Возникла ошибка при работе с БД: PostgreSQL');
            console.error(error);
            return { result: 'error' };
        }
    },

    changeRole: async (pool: Pool, userData: { schema: string, id: number, role: string }) => {
        try {
            const queryText = `UPDATE ${userData.schema} SET role = $1 WHERE id = $2 RETURNING *`;
            const values = [userData.role, userData.id];
            const res = await pool.query(queryText, values);

            if (res.rows.length > 0) {
                return {
                    result: 'success',
                    data: res.rows[0]
                };
            } else {
                return {
                    result: 'error',
                    code: 'failed_update_role'
                };
            }
        } catch (error) {
            console.error('Возникла ошибка при работе с БД: PostgreSQL');
            console.error(error);
            return {result: 'error'};
        }
    },

    getAllBooks: async (pool: Pool, bookData: { schema: string }) => {
        try {
            const queryText = `SELECT * FROM ${bookData.schema}`;
            const res = await pool.query(queryText);

            if (res.rows.length > 0) {
                return {
                    result: 'success',
                    data: res.rows
                };
            } else {
                return {
                    result: 'error',
                    code: 'failed_get_all_books'
                };
            }
        } catch (error) {
            console.error('Возникла ошибка при работе с БД: PostgreSQL');
            console.error(error);
            return {result: 'error'};
        }
    },

    getBookByID: async (pool: Pool, bookData: { schema: string, id: number }) => {
        try {
            const queryText = `SELECT * FROM ${bookData.schema} WHERE id = $1`;
            const values = [bookData.id];
            const res = await pool.query(queryText, values);

            if (res.rows.length > 0) {
                return {
                    result: 'success',
                    data: res.rows[0]
                };
            } else {
                return {
                    result: 'error',
                    code: 'failed_get_book_by_id'
                };
            }
        } catch (error) {
            console.error('Возникла ошибка при работе с БД: PostgreSQL');
            console.error(error);
            return {result: 'error'};
        }
    }
}
