import { Router } from "express";
import userController from '../controllers/bookController';
import authMiddleware from "../middleware/authMiddleware";


const router = Router();


router.get('/books', userController.getAllBooks);

router.get('/books/:id', userController.getBookByID);

// router.post('/books', authMiddleware(['ADMIN']), userController.addBook);

router.post('/books',  userController.addBook);

router.put('/books/:id', authMiddleware(['ADMIN']), userController.updateBook);

router.delete('/books/:id', authMiddleware(['ADMIN']), userController.deleteBook);

export default router;
