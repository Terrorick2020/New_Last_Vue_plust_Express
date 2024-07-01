import { createStore } from 'vuex';
import UserInfo from './modules/UserInfo.js';
import BookStore from './modules/BookStore.js';


const store = createStore({
    modules: { UserInfo, BookStore }
});

export default store;