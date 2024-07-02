import { Router } from "express";
import userController from '../controllers/userController';


const router = Router();

router.get( '/users/me', userController.getUserInfo );

router.post( '/autorization', userController.autorizationUser );

router.post( '/registration', userController.regUser );

router.get('/books', userController.getAllBooks);

router.get('/books/:id', userController.getBookByID);

router.post('/books', userController.addBook);

router.put('/books/:id', userController.updateBook);

router.delete('/books/:id', userController.deleteBook);

router.put('/users/:id/role', userController.changeRole);

export default router;
