<template>
    <AccountHeader :nav_attr="nav_attr" :btn_name="btn_name" />
    <div class="book">
        <BodyBook />
        <Footer />
    </div>
</template>

<script>
import AccountHeader from './components/AccountHeader.vue';
import BodyBook from './components/BodyBook.vue';
import Footer from './components/Footer.vue';


export default {
    components: { AccountHeader, BodyBook, Footer },
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
            btn_name: {
                name: 'Назад',
                path: '/client'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.book {
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