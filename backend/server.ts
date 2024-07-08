import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

import userRouter from './routes/userRouter';
import apiRouter from './routes/apiRouter';
import publicRouter from './routes/publicRouter';


const PORT: number = Number( process.env.PORT || 5000 );
const HOST: string = process.env.HOST || '127.0.0.1';
const MODE: string = process.env.MODE || 'alpha-version';


const app = express();

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) )
app.use( express.static( path.join( __dirname, '../frontend/dist' ) ) );

app.use(cors());

app.use( userRouter );
app.use( apiRouter );
app.use( publicRouter );

const start =  () => {
    try {
        app.listen( PORT, HOST, () => {
            console.log( `Сервер работает по адресу: http://${HOST}:${PORT}` );
            console.log( `Проект на стадии: ${MODE}` );
        })
    } catch ( error ) {
        console.log( error )
    }
}

start();