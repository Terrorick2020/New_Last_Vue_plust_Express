const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/.env' });


const PORT: number = Number( process.env.PORT || 5000 );
const HOST: string = process.env.HOST || '127.0.0.1';
const MODE: string = process.env.MODE || 'alpha-version';


const app = express();
app.listen( PORT, HOST, () => {
    console.log( `Сервер работает по адресу: http//:${HOST}:${PORT}` );
    console.log( `Проект на стадии: ${MODE}` );
} )