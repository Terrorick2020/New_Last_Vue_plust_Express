import { Request, Response } from "express";
import dotenv from 'dotenv';
import db_connect from '../config/postgres_db';

let pool_config = JSON.parse(process.env.POSTGRES_CONFIG || '{"config":"undefined"}');
let user_config = JSON.parse(process.env.USER_CONFIG || '{"config":"undefined"}');

if (pool_config.config === "undefined" || user_config.config === "undefined") {
    throw new Error(`Ошибка конфигурации контроллера!`);
}

export default {
    changeRole: async (req: Request, res: Response) => {
        try {
            req.body["id"] = req.params.id;
            user_config = { ...user_config, ...req.body };

            const pool = await db_connect.connect_to_postgres_db(pool_config);

            if (!pool) {
                throw new Error(`Возникла ошибка: объект pool: ${pool}! Не получается подключиться к бд: PostgreSQL!`);
            }

            const result = await db_connect.changeRole(pool, user_config);

            if (result.result === 'success') {
                res.status(200).json(result);
            } else {
                res.status(401).json({ 'result': 'role_change_error', 'code': result.code });
            }
        } catch (error) {
            console.error(`Возникла ошибка с контроллером при попытке смены роли пользователя!`);
            console.error(error);
            res.status(500).json({ 'result': 'server_error' });
        }
    }
}
