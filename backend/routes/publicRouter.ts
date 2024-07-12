import { Router } from "express";
import publicController from '../controllers/publicController';


const router = Router();

router.get('*', publicController.publicNavigation )

export default router;