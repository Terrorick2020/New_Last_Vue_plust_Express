<template>
    <Header :nav_attr="nav_attr" :btn_name="getAuthStatus ? alternate_btn_name : base_btn_name" />
    <div class="main">
        <Info />
        <Condition />
        <Footer />
    </div>
</template>

<script>
import Header from './components/Header.vue';
import Info from './components/Info.vue';
import Condition from './components/Condition.vue';
import Footer from './components/Footer.vue';
import { mapGetters } from 'vuex';


export default {
    components: { Header, Info, Condition, Footer },
    computed: {
        ...mapGetters([ 'getAuthStatus' ])
    },
    data() {
        return {
            nav_attr: [
                {
                    name: 'О нас',
                    navHandler: () => {
                        window.scrollTo({
                            top: window.outerHeight,
                            behavior: 'smooth'
                        });
                    }
                },
                {
                    name: 'Инфомация',
                    navHandler: () => console.log('Инфомация')
                },
                {
                     name: 'Книги',
                     navHandler: () => console.log('Книги')
                }
            ],
            base_btn_name: {
                name: 'Авторизация',
                path: '/authorization'
            },
            alternate_btn_name: {
                name: 'Личная страница',
                path: '/client'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.main {
    position: absolute;
    top: 0;
    width: 100%;
    padding: 0 10%;
    background-image: url('../assets/background_reg_log.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: multiply;
    background-color: rgba(0, 0, 0, 0.25);
    min-height: 100lvh;
}
</style>