import { Request, Response } from "express";
import dotenv from 'dotenv';
import db_connect from '../config/postgres_db';
import jwt from 'jsonwebtoken';
import { sendConfirmationEmail } from '../services/mailer';

dotenv.config();

let pool_config = JSON.parse(process.env.POSTGRES_CONFIG || '{"config":"undefined"}');
let user_config = JSON.parse(process.env.USER_CONFIG || '{"config":"undefined"}');
let jwt_key = process.env.JWT_KEY || 'SECRET_KEY_RANDOM';

if (pool_config.config === "undefined" || user_config.config === "undefined") {
    throw new Error(`Ошибка конфигурации контроллера!`);
}

export default {
    autorizationUser: async (req: Request, res: Response) => {
        try {
            user_config = { ...user_config, ...req.body };

            const pool = await db_connect.connect_to_postgres_db(pool_config);

            if (!pool) {
                throw new Error(`Возникла ошибка: объект pool: ${pool}! Не получается подключиться к бд: PostgreSQL!`);
            }

            const isAuthenticated = await db_connect.identify_user(pool, user_config);

            if (isAuthenticated) {
                const payload = { 
                    id: isAuthenticated.id,
                    login: user_config.login,
                    role: isAuthenticated.role
                };

                const token = jwt.sign(payload, jwt_key, { expiresIn: '24h' });

                res.status(200).json({ 'result': 'success', 'token': token, 'payload': payload});
            } else {
                res.status(401).json({ 'result': 'authorization_error' });
            }
        } catch (error) {
            console.error(`Возникла ошибка с контроллером при попытке авторизации пользователя!`);
            console.error(error);
            res.status(500).json({ 'result': 'server_error' });
        }
    },

    regUser: async (req: Request, res: Response) => {
        try {
            user_config = { ...user_config, ...req.body };

            const pool = await db_connect.connect_to_postgres_db(pool_config);

            if (!pool) {
                throw new Error(`Возникла ошибка: объект pool: ${pool}! Не получается подключиться к бд: PostgreSQL!`);
            }

            const result = await db_connect.add_user(pool, user_config);

            if (result.result === 'success') {
                const token = jwt.sign({ userId: user_config.id }, jwt_key, { expiresIn: '1h' });
                await sendConfirmationEmail(user_config.email, token);

                res.status(200).json(result);
            } else {
                res.status(401).json({ 'result': 'registration_error', 'code': result.code });
            }
        } catch (error) {
            console.error(`Возникла ошибка с контроллером при попытке регистрации пользователя!`);
            console.error(error);
            res.status(500).json({ 'result': 'server_error' });
        }
    }
}
