import mysql from 'mysql2/promise';


export default {
    connect_to_mysql_db: async ( pool_config: Object ) => {
        try {
            let pool = await mysql.createPool( pool_config );

            const [ result ] = await pool.execute('SELECT 1');

            if (result[0] && result[0]['1'] === 1) {
                console.log(`Успешное подключение к БД: MySQL. Пул соединений успешно создан.`);
            } else {
                console.log(`Возникла ошибка при создании пула`);
            }

            return pool;
        } catch ( error ) {
            console.error( `Возникла ошибка при подключении к БД: MySQL! /*1` );
            console.error( error );
        }
    },
    identification_user: async ( pool: mysql.Pool, user_data: Object ) => {
        try {
            const sql = `SELECT id FROM ${user_data['sheme']} WHERE login=? AND pswd=?`;
            const params = [ user_data['login'], user_data['pswd'] ];
            const [ rows ] = await pool.execute( sql, params );

            if( rows[0] ) {
                return true;
            } else {
                return false;
            }
        } catch ( error ) {
            console.error( `Возникла ошибка при работе с БД: MySQL! /*2` );
            console.error( error );
        }
    },
    add_user: async ( poll: mysql.Pool, user_data: Object ) => {
        try {
            const sql = `INSERT INTO ${user_data['sheme']} (login, email, pswd) VALUES (?, ?, ?)`;
            const params = [ user_data['login'], user_data['email'], user_data['pswd'] ];
            const [ result ] = await poll.execute( sql, params );
            
            if( result ) {
                return {
                    'result': 'error',
                    'code': 'success_reg_user'
                };
            }

        } catch ( error ) {
            if( error.code == 'ER_DUP_ENTRY' ) {
                return { 
                    'code': error.code,
                    'dup_pos': error.sqlMessage.includes('login') ? 'login' : error.sqlMessage.includes('email') ? 'email' : 'undefined'
                };
            } else {
                console.error( `Возникла ошибка при работе с БД: MySQL! /*3` );
                console.log( error );
            }
        }
    }
}