import { Router } from "express";
import userController from '../controllers/userController';
import authMiddleware from "../middleware/authMiddleware";


const router = Router();

router.put('/users/:id/role', authMiddleware(['ADMIN']), userController.changeRole);

router.get('/confirm/:token', userController.verifyMail);   

<<<<<<< HEAD
router.get('/autorization', userController.cheackMail);
=======
router.get('/authorization/confirm', userController.cheackMail);
>>>>>>> 904697ebfb63044cc2194402ea078b59c32d7d36


export default router;