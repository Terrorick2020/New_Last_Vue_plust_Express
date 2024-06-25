import { MongoClient } from 'mongodb';


let client;

export default {
    connect_to_mongo_db: async ( uri ) => {
        if( !client ) {
            client = new MongoClient( uri );
            try {
                await client.connect();
                console.log( `Успешное подключение к БД: Mongo!` );
                return client;
            } catch ( error ) {
                console.log( `Возникла ошибка при подключении к БД: Mongo!` )
                console.log( error );
            }
        } else {
            console.log( `Объект ${client} уже существует!` )
        }
    }
}