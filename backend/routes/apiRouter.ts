import { Router } from "express";
import apiController from '../controllers/apiController';


const router = Router();

<<<<<<< HEAD
router.post( '/autorization', apiController.autorizationUser );
=======
router.post( '/authorization', apiController.autorizationUser );
>>>>>>> 904697ebfb63044cc2194402ea078b59c32d7d36

router.post( '/registration', apiController.regUser );

router.post( '/refresh_token', apiController.refreshToken );

export default router;