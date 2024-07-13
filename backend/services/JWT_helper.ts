import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import client from '../config/redis_connect';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  id: number; 
  login: string;
  role: string[]; 
}

const signAccessToken = (my_payload: JwtPayload): string => {
  try {
    const payload = my_payload;
    const secret = process.env.ACCESS_TOKEN_SECRET as string;
    const options = {
      expiresIn: '1h'
    };
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

const verifyAccessToken = (access_token: string) => {
  try {
    const payload = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
    return payload as JwtPayload;
  } catch(err) {
    console.log(`Ошибка при верификации токена - ${err}`)
  }
};

const signRefreshToken = (my_payload: JwtPayload): string => {
  try {
    const payload = my_payload;
    const secret = process.env.REFRESH_TOKEN_SECRET as string;
    const options = {
      expiresIn: '1y' 
    };
    const token = jwt.sign(payload, secret, options);
    client.set(my_payload.id.toString(), token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
      if (err) {
        console.error(err.message);
        return;
      }
    });

    return token;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

const verifyRefreshToken = async (refreshToken: string) => {
  try {
    const decodedPayload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;
    const userId = decodedPayload.id;
    const storedToken = await new Promise<string>((resolve, reject) => {
      client.get(userId, (err, result) => {
        if (err) {
          console.error(err.message);
          reject(createError.InternalServerError());
          return;
        }
        resolve(result || '');
      });
    });

    if (refreshToken !== storedToken) {
      throw createError.Unauthorized();
    }
    const { iat, exp, ...rest } = decodedPayload;
    return rest;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

const verifyRefreshTokenFromMail = async (refreshToken: string) => {
  try {
    const decodedPayload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;
    const userId = decodedPayload.id as number;
    return userId;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export default {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyRefreshTokenFromMail
};
