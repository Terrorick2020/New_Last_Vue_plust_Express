<template>
    <Header :nav_attr="nav_attr" :btn_name="btn_name" />
    <div class="client">

    </div>
</template>

<script>
import Header from './components/Header.vue';


export default {
    components: { Header },
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