import { Router } from "express";
import userController from '../controllers/userController.ts';



const router = Router();

router.get( '/user', userController.getUserInfo );

export default router;