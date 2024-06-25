import { Router } from "express";
import userController from '../controllers/userController.ts';


const router = Router();

router.post( 'api/autorization', userController.autorizationUser );

router.post( 'api/registration', userController.regUser );

export default router;