import path from "path";


export default {
    publicNavigation: ( req: any, res: any ) => {
        res.status(200).sendFile( path.join( __dirname, '../../frontend/dist/index.html' ) );
    }
}