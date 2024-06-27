export default {
    getUserInfo: ( req, res ) => {
        let data = {
            name: 'John',
            age: 32,
            email: 'John@mail.com'
        };
        res.status( 200 ).json( data );
    }
}