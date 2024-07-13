const { Client } = require('pg');
const axios = require('axios');



async function connectToDatabase() {
    const client = new Client({
        user: 'admin',
        host: '185.218.0.150',
        database: 'rick_db',
        password: '083Hdwd3',
        port: 5432,
    });

    await client.connect();
    return client;
}

async function createTable(client) {
    try {
        await client.query(`
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS books;
            DROP TABLE IF EXISTS book_texts;
            create TABLE users(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role TEXT[]
);

create TABLE books(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    publication INTEGER,
    year INTEGER,
    author_name VARCHAR(255),
    description TEXT,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

create TABLE book_texts(
    id SERIAL PRIMARY KEY,
    book_text TEXT,
    book_id INTEGER NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books (id)
);
        `);
        console.log("Таблица успешно создана");
    } catch (error) {
        console.error("Ошибка при создании таблицы:", error.stack);
    }
}



async function main() {
    const client = await connectToDatabase();
    await createTable(client);

    client.end(); 
}

main().catch(console.error); 