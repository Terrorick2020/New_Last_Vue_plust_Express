<template>
    <AccountHeader :nav_attr="nav_attr" :btn_name="btn_name" />
    <div class="client">
        <Books />
        <Footer />
    </div>
</template>

<script>
import AccountHeader from './components/AccountHeader.vue';
import Books from './components/Books.vue';
import Footer from './components/Footer.vue';


export default {
    components: { AccountHeader, Books, Footer },
    data() {
        return {
            nav_attr: [
                {
                    name: 'О нас'
                },
                {
                    name: 'Инфомация'
                },
                {
                    name: 'Книги'
                }
            ],
            btn_name: {
                name: 'Главная',
                path: '/authorization'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.client {
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