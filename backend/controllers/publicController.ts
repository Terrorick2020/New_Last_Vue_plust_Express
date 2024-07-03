import path from "path"
import { Request, Response } from "express";


export default {
    publicNavigation: (req: Request, res: Response) => {
        res.sendFile( path.join( __dirname, '../../frontend/dist/index.html' ) );
    }
}