<template>
    <div class="books">
        <div class="books__preview">
            <img src="../../assets/my_pet.png" alt="pet" class="magick__pet">
            <img src="../../assets/client_sms.png" alt="message" class="magick__sms">
        </div>
        <div class="book__title">
            <h1>Список всеми искаемой литературы</h1>
            <p>😇Здесь ты сможешь найти ответы на все свои вопросы, так что удачи тебе и терпения!</p>
        </div>
        <div class="books__content">
            <div class="content__item" v-for="(elem, index) in getBookList" :key="elem.id">
                <div class="item__marker" @click="itemToFavorite(elem.id)">
                    <svg class="marker__default" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" v-if="elem.is_favorite">
                        <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"/>
                    </svg>
                    <svg class="marker__favorite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" v-else>
                        <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/>
                    </svg>
                </div>
                <h4 class="item__title">{{ elem.title }}</h4>
                <p class="item__description">{{ elem.discription }}</p>
                <router-link to="/book" class="item__link">
                    <p>Читать полностью</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                    </svg>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            baseCount: 6
        }
    },
    methods: {
        itemToFavorite(id) {
            this.$store.dispatch( 'bookToFavorite', id );
        }
    },
    computed: {
        getBookList() {
            return this.$store.getters.getBookList
        }
    }
}
</script>

<style lang="scss" scoped>
.books {
    margin-top: 150px;

    .books__preview {
        position: relative;

        .magick__pet {
            margin-left: 15%;
            width: 600px;
            height: auto;
        }

        .magick__sms {
            position: absolute;
            top: -10%;
            right: 25%;
            width: 600px;
            height: auto;
        }

    }

    .book__title {
        margin-top: 100px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        h1 {
            font-size: 3em;
            text-align: center;
            width: 100%;
        }

        p {
            margin-top: 25px;
            width: 100%;
            margin-left: 15%;
        }
    }

    .books__content {
        margin-top: 50px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 50px;

        .content__item {
            position: relative;
            cursor: pointer;
            width: 400px;
            height: 450px;
            border: 2px solid rgb(185, 185, 185);
            border-radius: 10px;
            background: transparent;
            backdrop-filter: blur(20px);
            padding: 20px 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            transition: all 0.5s ease;

            &:hover {
                translate: 5px -3px;
            }

            &:last-of-type {
                justify-self: center;
            }

            .item__marker {
                position: absolute;
                top: 1px;
                right: 7px;

                &:hover {
                    svg {
                        scale: 1.05;
                    }
                }

                svg {
                    width: 30px;
                    height: auto;
                    transition: all 0.2s ease;

                }
            }

            .item__title {
                text-align: center;
                width: 100%;
                font-size: 1.1em;
                font-weight: 900;
            }

            .item__description {
                width: 100%;
                margin: 20px 0 40px 0;
                font-weight: 300;
            }

            .item__link {
                cursor: pointer;
                width: 100%;
                border: 2px solid black;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                border-radius: 5px;
                padding: 5px 30px 5px 10px;
                color: black;
                transition: all 0.5s ease;
                background: transparent;

                &:hover {
                    padding-right: 10px;
                    color: white;

                    svg {

                        path {
                            fill: white;
                        }
                    }
                }

                svg {
                    width: 20px;
                    height: auto;
                }
            }
        }
    }
}
</style>