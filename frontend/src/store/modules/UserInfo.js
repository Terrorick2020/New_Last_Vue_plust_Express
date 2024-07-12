import axios from 'axios';


export default {
    actions: {
        async addUser( context, payload ) {
            try {
                const response = await axios.post('http://localhost:3000/registration', payload[0], {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if( response.data.result === "success" && response.data.AccessToken && response.data.RefreshToken && !response.data.code ) {
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
                const response = await axios.post('http://localhost:3000/authorization', payload[0], {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if( response.data.result === 'success' && response.data.accessToken && !response.data.code ) {
                    payload.push( response.data );
                    context.commit( 'updateUserInfo', payload );
                }
            } catch ( error ) {
                console.error( `Возникла ошибка при авторизации пользователя!` );
                console.log( error );
            }
        },
        async confirmMail( context ) {
            try {
                let response = await axios.get('http://localhost:3000/authorization/confirm', {
                    responseType: 'json'
                });

                if( response.data.isValid && response.data.result === 'success' ) {
                    context.commit( 'updateValid' );
                }
            } catch ( error ) {
                console.error( `Возникла ошибка при подтверждении почты пользователя!` );
                console.info( error );
            }
        },
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
            state.user_info.role = payload[0].role ? payload[0].role : [ 'USER' ]

            state.user_info.remember_me = payload[1];

            state.user_info.accessToken = payload[2].AccessToken;
            state.user_info.refreshToken = payload[2].RefreshToken;
        },
        resetAuth( state ) {
            state.user_info.isAuth = false;
        },
        delInfo( state ) {
            state.user_info = {
                username: undefined,
                email: undefined,
                AccessToken: '',
                RefreshToken: '',
                role: undefined,
                remember_me: undefined,
                isAuth: false,
                isValid: true
            };
            state.user_icon = undefined;
        },
        updateValid( state ) {
            state.user_info.isAuth = false;
            state.user_info.isValid = true;
        }
    },
    state: {
        user_info: {
            username: undefined,
            email: undefined,
            AccessToken: '',
            RefreshToken: '',
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
        getValidStatus: state => state.user_info.isValid,
        getAuthStatus: state => state.user_info.isAuth,
        getTokenStatus: state => state.user_info.AccessToken && state.user_info.AccessToken
    }
}