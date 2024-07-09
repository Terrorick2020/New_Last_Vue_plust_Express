import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';
import db_connection from '../config/dbConnection';
import userManager from "../config/userManager";
import jwt from '../services/JWT_helper';
// import { sendConfirmationEmail } from '../services/mailer';

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

            const pool = await db_connection.connectToPostgresDB(pool_config);

            if (!pool) {
                throw new Error(`Возникла ошибка: объект pool: ${pool}! Не получается подключиться к бд: PostgreSQL!`);
            }

            const isAuthenticated = await userManager.identifyUser(pool, user_config);

            if (isAuthenticated) {
                const payload = { 
                    id: isAuthenticated.id,
                    login: user_config.login,
                    role: isAuthenticated.role
                };
                let AccessToken = jwt.signAccessToken(payload);
                let RefreshToken = jwt.signRefreshToken(payload);
                console.log(AccessToken);
                console.log(RefreshToken);                res.status(200).json({ 'result': 'success', 'AccessToken': AccessToken, 'RefreshToken': RefreshToken });
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

            const pool = await db_connection.connectToPostgresDB(pool_config);

            if (!pool) {
                throw new Error(`Возникла ошибка: объект pool: ${pool}! Не получается подключиться к бд: PostgreSQL!`);
            }

            const result = await userManager.addUser(pool, user_config);

            const payload = { 
                id: result.id,
                login: user_config.login,
                role: user_config.role
            };

            if (result.result === 'success') {
                // await sendConfirmationEmail(user_config.email, access_token);
                let AccessToken = jwt.signAccessToken(payload);
                let RefreshToken = jwt.signRefreshToken(payload);

                res.status(200).json({ 'result': 'success', 'AccessToken': AccessToken, 'RefreshToken': RefreshToken });
            } else {
                res.status(401).json({ 'result': 'registration_error', 'code': result.code });
            }
        } catch (error) {
            console.error(`Возникла ошибка с контроллером при попытке регистрации пользователя!`);
            console.error(error);
            res.status(500).json({ 'result': 'server_error' });
        }
    },
    refreshToken: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let refreshToken = req.body['refresh_token'];
      
            if (!refreshToken) {
                throw new Error("Ошибка - не передан refresh_token");
            }

            const payload = await jwt.verifyRefreshToken(refreshToken);
            console.log(req.body);

            const AccessToken = await jwt.signAccessToken(payload);
            const RefreshToken = await jwt.signRefreshToken(payload);
      
            res.status(200).json({
                result: 'success',
                AccessToken,
                RefreshToken,
            });
        } catch (error) {
            next(error);
        }
      }
      
}
