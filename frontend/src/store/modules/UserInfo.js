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

                if( response.data.AccessToken && response.status === 200 ) {
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

                console.log( response )

                if( response.status === 200 ) {
                    payload.push( response.data.payload );
                    console.log( payload );
                    context.commit( 'updateUserInfo', payload );
                    context.commit( 'updateValid' );
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

                if( response.data.isvalid && response.data.result === "success" ) {
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

            state.user_info.remember_me = payload[1];

            state.user_info.user_id = payload[2].id;
            state.user_info.role = payload[2].role ? payload[2].role : ['USER'];
        },
        resetAuth( state ) {
            state.user_info.isAuth = false;
        },
        delInfo( state ) {
            state.user_info = {
                username: undefined,
                email: undefined,
                role: undefined,
                remember_me: undefined,
                isAuth: false,
                isValid: false
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
            username: 'Goest',
            user_id:  null,
            email: undefined,
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
        getUserId: state => state.user_info.user_id,
        getAbilityEdit: state => state.user_info.role.includes( 'USER' ) && state.user_info.role.includes( 'ADMIN' ),
        getValidStatus: state => state.user_info.isValid,
        getAuthStatus: state => state.user_info.isAuth
    }
}