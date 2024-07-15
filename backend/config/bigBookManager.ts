import { Pool } from 'pg';

export default {
    add_big_book: async (pool: Pool, bigBookData: { schema: string, book_text: string, book_id: number }) => { 
        try {
            const queryText = `INSERT INTO ${bigBookData.schema} (book_text, book_id) VALUES ($1, $2) RETURNING *`;
            const values = [bigBookData.book_text, bigBookData.book_id];
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

    delete_big_book: async (pool: Pool, bigBookData: { schema: string, book_id: number }) => {
        try {
            const queryText = `DELETE FROM ${bigBookData.schema} WHERE book_id = $1 RETURNING *`;
            const values = [bigBookData.book_id];
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

    // update_big_book: async (pool: Pool, bookId: number, updates: { [key: string]: any }) => {
    //     try {
    //         const keys = Object.keys(updates);
    //         const values = Object.values(updates);
    //         values.push(bookId); 
    
    //         const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    
    //         const queryText = `UPDATE books SET ${setClause} WHERE book_id = $${keys.length + 1} RETURNING *`;
    
    //         const res = await pool.query(queryText, values);
     
    //         if (res.rows.length > 0) {
    //             return {
    //                 result: 'success',
    //                 data: res.rows[0]
    //             };
    //         } else {
    //             return {
    //                 result: 'error',
    //                 code: 'failed_update_book'
    //             };
    //         }
    //     } catch (error) {
    //         console.error('Возникла ошибка при работе с БД: PostgreSQL');
    //         console.error(error);
    //         return { result: 'error' };
    //     }
    // },

    

    getBigBookByID: async (pool: Pool, bigBookData: { schema: string, book_id: number }) => {
        try {
            const queryText = `SELECT * FROM ${bigBookData.schema} WHERE book_id = $1`;
            const values = [bigBookData.book_id];
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