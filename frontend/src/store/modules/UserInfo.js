import axios from 'axios';


export default {
    actions: {
        async addUser( context, payload ) {
            try {
                const response = await axios.post('http://localhost:3000/api/registration', payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if( response.data.result === 'success' && !response.data.code ) {
                    context.commit( 'updateUserInfo', payload );
                }
            } catch ( error ) {
                console.log( `Возникла ошибка при добавлении пользователя!` );
                console.error( error );
            }
        },
        async identificationUser( context, payload ) {
            try {
                const response = await axios.post('http://localhost:3000/api/registration', payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if( response.data.result === 'success' && !response.data.code ) {
                    context.commit( 'updateUserInfo', payload );
                }
            } catch ( error ) {

            }
        }
    },
    mutations: {
        updateUserInfo( state, payload ) {
            state.user_info.isAuth = true;
            state.user_info.username = payload.login;
            state.user_info.email = payload.email;
        }
    },
    state: {
        user_info: {
            userId: null,
            username: 'Fallen Angel',
            email: '',
            accessToken: '',
            refreshToken: '',
            role: '',
            expiresIn: '',
            isAuth: false,
        },
        personal_info: {
            icon: ''
        }
    },
    getters: {
        getUserName: state => state.user_info.username,
        getUserIcon: state => state.personal_info.icon,
        getAuthStatus: state => state.user_info.isAuth
    }
}