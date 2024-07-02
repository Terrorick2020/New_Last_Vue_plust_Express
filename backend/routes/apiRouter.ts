import { Router } from "express";
import apiController from '../controllers/apiController';


const router = Router();

router.post( '/autorization', apiController.autorizationUser );

router.post( '/registration', apiController.regUser );

export default router;