import axios from 'axios';


export default {
    actions: {
        async addUser( context, login, email, pswd, role ) {
            try {
                const response = await axios('http://localhost:3000/registration',
                    {
                        'login': login,
                        'email': email,
                        'pswd': pswd,
                        'role': role
                    },
                    {
                        headers: {
                            'Content-Type': application/x-www-form-urlencoded
                        }
                    }
                );
                context.commit( 'updateUserInfo', response.data );
            } catch ( error ) {
                console.log( `Возникла ошибк при добавлении пользователя!` );
                console.error( error );
            }
        }
    },
    mutations: {
        updateUserInfo( state, userInfo ) {
            state.user_info.userId = userInfo.userId;
            state.user_info.userName = userInfo.userName;
            state.user_info.email = userInfo.email;
            state.user_info.accessToken = userInfo.accessToken;
            state.user_info.refreshToken = userInfo.refreshToken;
            state.user_info.role = userInfo.role;
            state.user_info.expiresIn = userInfo.expiresIn;
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
            expiresIn: ''
        },
        personal_info: {
            icon: ''
        }
    },
    getters: {
        getUserName: state => state.user_info.username,
        getUserIcon: state => state.personal_info.icon
    }
}