import { Pool } from 'pg';


export default {
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
};

