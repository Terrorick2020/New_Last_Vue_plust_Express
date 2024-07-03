import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import RegLog from '../pages/RegLog.vue';
import Account from '../pages/Account.vue';
import Book from '../pages/Book.vue';
import PrivateError from '../pages/PrivateError.vue';


const base_routes = [
    '/home',
    '/authorization',
    '/client',
    '/book'
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/home', name: 'home' , component: MainPage, meta: { title: 'Главная' }, alias: '/' },
        { path: '/authorization', name: 'authorization', component: RegLog, meta: { title: 'Авторизация' } },
        { path: '/client', name: 'client', component: Account, meta: { title: 'Личный кабинет' } },
        { path: '/book', name: 'book', component: Book, meta: { title: 'Книга' } },
        { path: '/error', name: 'error', component: PrivateError }
    ]
});

router.beforeEach( (to, from, next) => {
    document.title = to.meta.title || 'Ошибка';
    const foundRouter = router.getRoutes().find( route => route.path === to.path )
    if( foundRouter ) {
        next();
    } else {
        next( { path: '/error', replace: true } )
    }
} )

export default router;