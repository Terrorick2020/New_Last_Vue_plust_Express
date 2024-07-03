import { Pool } from 'pg';
import bcrypt from 'bcrypt';

export default{ 
    identifyUser: async (pool: Pool, userData: { schema: string, login: string, password: string }) => {
        try {
            const queryText = `SELECT id, password, role FROM ${userData.schema} WHERE login=$1`;
            const values = [userData.login];
            const res = await pool.query(queryText, values);
        
            if (res && res.rowCount && res.rowCount > 0) {
            const user = res.rows[0];
            const isPasswordValid = await bcrypt.compare(userData.password, user.password);
            
            if (isPasswordValid) {
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

    addUser: async (pool: Pool, userData: { schema: string, login: string, email: string, password: string, role: string[] }) => {
        try {
            const checkUserQuery = `SELECT id FROM ${userData.schema} WHERE login=$1`;
                const checkUserValues = [userData.login];
                const checkUserRes = await pool.query(checkUserQuery, checkUserValues);

                if (checkUserRes && checkUserRes.rowCount !== null && checkUserRes.rowCount > 0) {
                    return {
                        result: 'error',
                        code: 'user_exists',
                        message: 'Пользователь с таким логином уже существует'
                    };
                }

                if (!checkUserRes) {
                    return {
                        result: 'error',
                        code: 'db_not_exists',
                        message: 'не удалось подключиться к базе данных'
                    };
                }

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
                return { result: 'error' };
            }
        }
    },

    changeUserRole: async (pool: Pool, userData: { schema: string, id: number, role: string[] }) => {
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
            return { result: 'error' };
        }
    }
};
