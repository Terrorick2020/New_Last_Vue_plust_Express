import { Router } from "express";
import userController from '../controllers/userController';
import authMiddleware from "../middleware/authMiddleware";


const router = Router();

router.put('/users/:id/role', authMiddleware(['ADMIN']), userController.changeRole);


export default router;