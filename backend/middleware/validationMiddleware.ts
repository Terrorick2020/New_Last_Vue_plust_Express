import Joi from '@hapi/joi';


const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).max(16).required(),
}).unknown();

export default authSchema;
