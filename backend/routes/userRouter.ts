import { Router } from "express";
import userController from '../controllers/userController';


const router = Router();

router.get( '/user', userController.getUserInfo );
router.get( '/user/books', userController.getBookS )

export default router;