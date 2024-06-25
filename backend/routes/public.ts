import { Router } from "express";
import path from "path";
import userController from '../controllers/userController.ts';


const router = Router();

router.get('*', (req, res) => {
    res.sendFile( path.join( __dirname, '../../frontend/dist/index.html' ) );
})

export default router;