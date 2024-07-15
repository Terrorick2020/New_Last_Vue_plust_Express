import { Router } from "express";
import apiController from '../controllers/apiController';


const router = Router();

router.post( '/authorization', apiController.autorizationUser );

router.post( '/registration', apiController.regUser );

router.post( '/refresh_token', apiController.refreshToken );

export default router;