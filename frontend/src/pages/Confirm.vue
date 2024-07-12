<template>
    <div class="controller">
        <div class="controller__conteiner">
            <div v-if="!getValidStatus">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                </svg>
                <p>На вашу почту было отправлено письмо, перейдите по ссылке в нем и подтвердите, что вы являетесь её хозяином!</p>
            </div>
            <div class="conteiner__false" v-else>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm156.4 25.6c-5.3 7.1-15.3 8.5-22.4 3.2s-8.5-15.3-3.2-22.4c30.4-40.5 91.2-40.5 121.6 0c5.3 7.1 3.9 17.1-3.2 22.4s-17.1 3.9-22.4-3.2c-17.6-23.5-52.8-23.5-70.4 0z"/>
                </svg>
                <p>Почта успешно подтверждена! Удачного пути...</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
    name: 'Confirm',
    computed: {
        ...mapGetters(['getValidStatus'])
    },
    data() {
        return {}
    },
    mounted() {
        this.confirmMail();
    },
    methods: {
        async confirmMail() {
            let intervalId = null;

            intervalId = setInterval(async () => {
                try {
                    await this.$store.dispatch('confirmMail');

                    if( this.getValidStatus ) {
                        setTimeout( () => {
                            this.$router.push('/client');
                        }, 2_000 )
                    }
                } catch (error) {
                    console.error('Error during authorization check:', error);
                }
            }, 2_000);

            setTimeout( () => {
                clearInterval(intervalId);
            }, 180_000 )
        }
    }
}
</script>

<style lang="scss" scoped>
.controller {
    background-image: url('../assets/background_reg_log.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: multiply;
    background-color: rgba(0, 0, 0, 0.25);
    min-height: 100lvh;
    width: 100%;
    padding: 20% 10%;

    .controller__conteiner {
        width: 100%;
        min-height: 50px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 20px;
        padding: 10px 20px;

        div {

            &.conteiner__false {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;

                svg {
                    margin-right: 20px;
                }
            }

            svg {
                width: 30px;
                height: auto;
            }
    
            p {
                font-size: 26px;
            }
        }
    }
}
</style>