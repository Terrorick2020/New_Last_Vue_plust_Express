import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import RegLog from '../pages/RegLog.vue';
import Account from '../pages/Account.vue';
import Book from '../pages/Book.vue';
import Confirm from '../pages/Confirm.vue';
import PrivateError from '../pages/PrivateError.vue';
import { useStore } from 'vuex';


const base_routes = [
    '/home',
    '/authorization',
    '/client',
    '/book'
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/home', name: 'home' , component: MainPage, meta: { title: 'Главная', needAuth: false }, alias: '/' },
        { path: '/authorization', name: 'authorization', component: RegLog, meta: { title: 'Авторизация', needAuth: false } },
        { path: '/authorization/confirm', name: 'confirm', component: Confirm, meta: { title: 'Подтверждение', needAuth: true } },
        { path: '/client', name: 'client', component: Account, meta: { title: 'Личный кабинет', needAuth: true } },
        { path: '/client/book', name: 'book', component: Book, meta: { title: 'Книга', needAuth: true } },
        { path: '/error', name: 'error', component: PrivateError }
    ]
});

router.beforeEach( (to, from, next) => {
    document.title = to.meta.title || 'Ошибка';
    const foundRouter = router.getRoutes().find( route => route.path === to.path );
    if( foundRouter ) {
        const store = useStore();

        if( to.path === '/authorization/confirm' ) {
            next();
            if( to.meta.needAuth && store.getters.getTokenStatus && store.getters.getAuthStatus ) {
                next(); 
            } else {
                next( { path: '/error', replace: true } );
            }
        } else {
            if( to.path === '/authorization' && store.getters.getValidStatus && store.getters.getTokenStatus ) {
                next( { path: '/client', replace: true } );
            }

            if( to.meta.needAuth && ( !store.getters.getValidStatus || !store.getters.getTokenStatus ) ) {
                next( { path: '/authorization', replace: true } ); 
            } else {
                next();
            }
        }
    } else {
        next( { path: '/error', replace: true } );
    }
} )

export default router;