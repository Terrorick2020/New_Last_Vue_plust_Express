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

                if( response.data.result === 'success' && response.data.accessToken && !response.data.code ) {
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
                const response = await axios.post('http://localhost:3000/api/registration', payload[0], {
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

            state.user_info.accessToken = payload[2].accessToken;
        },
        delInfo( state ) {
            state.user_info = {
                username: undefined,
                email: undefined,
                accessToken: '',
                role: undefined,
                remember_me: undefined,
                isAuth: false,
            };
            state.user_icon = undefined;
        }
    },
    state: {
        user_info: {
            username: undefined,
            email: undefined,
            accessToken: '',
            role: undefined,
            remember_me: undefined,
            isAuth: false,
        },
        user_icon: undefined
    },
    getters: {
        getUserName: state => state.user_info.username,
        getUserIcon: state => state.user_icon,
        getAuthStatus: state => state.user_info.isAuth,
        getToken: state => state.user_info.accessToken
    }
}