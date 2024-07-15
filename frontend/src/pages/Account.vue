<template>
    <AccountHeader :nav_attr="nav_attr" :btn_name="btn_name" :searchFunction="searchFunction" @update:globalQuery="handlerQuery" />
    <div class="client">
        <Books :globalQuery="globalQuery" />
        <Footer />
    </div>
</template>

<script>
import AccountHeader from './components/AccountHeader.vue';
import Books from './components/Books.vue';
import Footer from './components/Footer.vue';


export default {
    name: 'Account',
    components: { AccountHeader, Books, Footer },
    mounted() {
        this.loadBooks()
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
            btn_name: {
                name: 'Главная',
                path: '/authorization'
            },
            searchFunction: () => {
                document.getElementById("book__title").scrollIntoView({ behavior: 'smooth' });
            },
            globalQuery: undefined
        }
    },
    methods: {
        handlerQuery(newQuery) {
            this.globalQuery = newQuery;
        },
        async loadBooks() {
            try {
                await this.$store.dispatch( 'loadBooks' );
            } catch ( error ) {
                console.error( `Возникла ошибки при подгрушзке данных на страницу!` );
                console.info( error );
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