import { Router } from "express";
import userController from '../controllers/bookController';
import authMiddleware from "../middleware/authMiddleware";


const router = Router();


router.get('/books', userController.getAllBooks);

router.get('/books/:id', userController.getBookByID);

<<<<<<< HEAD
// router.post('/books', authMiddleware(['ADMIN']), userController.addBook);

router.post('/books',  userController.addBook);

router.put('/books/:id', authMiddleware(['ADMIN']), userController.updateBook);
=======
router.post('/books', authMiddleware(['ADMIN']), userController.addBook);

// router.put('/books/:id', authMiddleware(['ADMIN']), userController.updateBook);
router.put('/books/:id', userController.updateBook);
>>>>>>> 904697ebfb63044cc2194402ea078b59c32d7d36

router.delete('/books/:id', authMiddleware(['ADMIN']), userController.deleteBook);

export default router;
