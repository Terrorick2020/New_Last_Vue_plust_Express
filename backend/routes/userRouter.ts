import { Router } from "express";
import userController from '../controllers/userController.ts';



const router = Router();

router.get( '/api', userController.getUserInfo );

router.post( '/autorization', userController.autorizationUser );

router.post( '/registration', userController.regUser );

export default router;