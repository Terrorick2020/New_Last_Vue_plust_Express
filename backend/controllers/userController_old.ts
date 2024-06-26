import MongoConnect from '../config/mongo_db.ts';
import MysqlConnect from '../config/mysql_db.ts';

require('dotenv').config( { path: 'backend/.env' } );

let pool_config =  JSON.parse( process.env.MySQL_CONFIG || '{"config":"undefined"}' );
let user_config = JSON.parse( process.env.USER_CONFIG || '{"config":"undefined"}' );

if( pool_config.config == "undefined" || user_config.config == "undefined" ) throw Error( `Ошибка конфиурации контроллера!` );


export default {
    getUserInfo: ( req, res ) => {
        let data = {
            name: 'John',
            age: 32,
            email: 'John@mail.com'
        };
        res.status( 200 ).json( data );
    },
    autorizationUser: async ( req, res ) => {
        try {
            user_config = { ...user_config, ...req.body };

            const pool = await MysqlConnect.connect_to_mysql_db( pool_config );

            if( !pool ) {
                throw Error( `Возникла ошибка: объект poll: ${pool}! Не получается подключиться к бд: MySQL!` )
            }

            const miss = await MysqlConnect.identification_user( pool, user_config );

            if( miss ) {
                res.status( 200 ).json( { 'result': 'success' } );
            } else {
                res.status( 401 ).json( { 'result': 'auterization_error' } );
            }
        } catch ( error ) {
            console.error( `Возникла ошибка с контроллером при попытке авторизации пользователя!` );
            res.status( 500 ).json( { 'result': 'server_error' } )
        }
    },
    regUser: async ( req, res ) => {
        try {
            user_config = { ...user_config, ...req.body };

            const pool = await MysqlConnect.connect_to_mysql_db( pool_config );

            if( !pool ) {
                throw Error( `Возникла ошибка: объект poll: ${pool}! Не получается подключиться к бд: MySQL!` )
            }

            const miss = await MysqlConnect.add_user( pool, user_config );

            if( miss ) {
                res.status( 200 ).json( miss );
            } else {
                res.status( 401 ).json( { 'result': 'registration_error', 'code': 'undefined' } );
            }
        } catch ( error ) {
            console.error( `Возникла ошибка с контроллером при попытке регистрации пользователя!` );
            res.status( 500 ).json( { 'result': 'server_error' } )
        }
    }
}