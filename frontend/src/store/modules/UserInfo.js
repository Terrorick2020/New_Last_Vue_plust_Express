import axios from 'axios';


export default {
    actions: {
        async addUser( context, payload ) {
<<<<<<< HEAD

            // console.log( payload[0] );

=======
>>>>>>> 904697ebfb63044cc2194402ea078b59c32d7d36
            try {
                const response = await axios.post('http://localhost:3000/registration', payload[0], {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

<<<<<<< HEAD
                console.log( response );

                if( response.data.result === "success" && response.data.AccessToken && response.data.RefreshToken && !response.data.code ) {
=======
                if( response.data.AccessToken && response.status === 200 ) {
>>>>>>> 904697ebfb63044cc2194402ea078b59c32d7d36
                    payload.push( response.data );
                    context.commit( 'updateUserInfo', payload );
                }
            } catch ( error ) {
                console.error( `Возникла ошибка при добавлении пользователя!` );
                console.log( error );
            }
        },
        async identificationUser( context, payload ) {
            try {
<<<<<<< HEAD
                const response = await axios.post('http://localhost:3000/api/registration', payload[0], {
=======
                const response = await axios.post('http://localhost:3000/authorization', payload[0], {
>>>>>>> 904697ebfb63044cc2194402ea078b59c32d7d36
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

<<<<<<< HEAD
                if( response.data.result === 'success' && response.data.accessToken && !response.data.code ) {
                    payload.push( response.data );
                    context.commit( 'updateUserInfo', payload );
=======
                console.log( response )

                if( response.status === 200 ) {
                    payload.push( response.data.payload );
                    console.log( payload );
                    context.commit( 'updateUserInfo', payload );
                    context.commit( 'updateValid' );
>>>>>>> 904697ebfb63044cc2194402ea078b59c32d7d36
                }
            } catch ( error ) {
                console.error( `Возникла ошибка при авторизации пользователя!` );
                console.log( error );
            }
        },
<<<<<<< HEAD
=======
        async confirmMail( context ) {
            try {
                let response = await axios.get('http://localhost:3000/authorization/confirm', {
                    responseType: 'json'
                });

                if( response.data.isvalid && response.data.result === "success" ) {
                    context.commit( 'updateValid' );
                }
            } catch ( error ) {
                console.error( `Возникла ошибка при подтверждении почты пользователя!` );
                console.info( error );
            }
        },
>>>>>>> 904697ebfb63044cc2194402ea078b59c32d7d36
        exitFromSys( context ) {
            try {
                context.commit( 'delInfo' )
            } catch ( error ) {
                console.error( `Возникла ошибка при выходе пользователя из системы!` );
                console.log( error );
            }
        }
    },
    mutations: {
        updateUserInfo( state, payload ) {
            state.user_info.isAuth = true;

            state.user_info.username = payload[0].login;
            state.user_info.email = payload[0].email;
<<<<<<< HEAD
            state.user_info.role = payload[0].role ? payload[0].role : [ 'USER' ]

            state.user_info.remember_me = payload[1];

            state.user_info.accessToken = payload[2].AccessToken;
            state.user_info.refreshToken = payload[2].RefreshToken;
=======

            state.user_info.remember_me = payload[1];

            state.user_info.user_id = payload[2].id;
            state.user_info.role = payload[2].role ? payload[2].role : ['USER'];
>>>>>>> 904697ebfb63044cc2194402ea078b59c32d7d36
        },
        resetAuth( state ) {
            state.user_info.isAuth = false;
        },
        delInfo( state ) {
            state.user_info = {
                username: undefined,
                email: undefined,
<<<<<<< HEAD
                AccessToken: '',
                RefreshToken: '',
=======
>>>>>>> 904697ebfb63044cc2194402ea078b59c32d7d36
                role: undefined,
                remember_me: undefined,
                isAuth: false,
                isValid: false
            };
            state.user_icon = undefined;
<<<<<<< HEAD
=======
        },
        updateValid( state ) {
            state.user_info.isAuth = false;
            state.user_info.isValid = true;
>>>>>>> 904697ebfb63044cc2194402ea078b59c32d7d36
        }
    },
    state: {
        user_info: {
<<<<<<< HEAD
            username: undefined,
            email: undefined,
            AccessToken: '',
            RefreshToken: '',
=======
            username: 'Goest',
            user_id:  null,
            email: undefined,
>>>>>>> 904697ebfb63044cc2194402ea078b59c32d7d36
            role: undefined,
            remember_me: undefined,
            isAuth: false,
            isValid: false
        },
        user_icon: undefined
    },
    getters: {
        getUserName: state => state.user_info.username,
        getUserIcon: state => state.user_icon,
<<<<<<< HEAD
        getValidStatus: state => state.user_info.isValid,
        getAuthStatus: state => state.user_info.isAuth,
        getTokenStatus: state => state.user_info.AccessToken && state.user_info.AccessToken
=======
        getUserId: state => state.user_info.user_id,
        getAbilityEdit: state => state.user_info.role.includes( 'USER' ) && state.user_info.role.includes( 'ADMIN' ),
        getValidStatus: state => state.user_info.isValid,
        getAuthStatus: state => state.user_info.isAuth
>>>>>>> 904697ebfb63044cc2194402ea078b59c32d7d36
    }
}