import { Router } from "express";
import apiController from '../controllers/apiController.ts';


const router = Router();

router.post( 'api/autorization', apiController.autorizationUser );

router.post( 'api/registration', apiController.regUser );

export default router;