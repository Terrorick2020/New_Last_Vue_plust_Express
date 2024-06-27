<template>
    <div class="authorization">
        <Header />
        <AuthorizeBody />
        <Footer />
    </div>
</template>

<script>
import Header from './components/Header.vue';
import AuthorizeBody from './components/AuthorizeBody.vue';
import Footer from './components/Footer.vue';


export default {
    components: { Header, AuthorizeBody, Footer },
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.authorization {
    background-image: url('../assets/background_reg_log.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: multiply;
    background-color: rgba(0, 0, 0, 0.25);
    min-height: 100lvh;
}
</style>