<template>
    <header class="header">
        <div class="header__logo">
            <router-link to="/home">
                <div class="logo__img">
                    <img src="" alt="">
                </div>
                <div class="logo__text">
                    <h2>MagcikLab</h2>
                    <p>Самый безопасный сайт!</p>
                </div>
            </router-link>
        </div>
        <div class="header__tools">
            <div class="tools__nav"></div>
            <div class="tools__persone">
                <div class="persone__search">
                    <input type="text">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                        </svg>
                    </button>
                </div>
                <div class="persone__name">{{ userName }}</div>
                <div class="persone__vidget">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M64 64C46.3 64 32 78.3 32 96l0 320c0 17.7 14.3 32 32 32l320 0c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L64 64zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm235 81.6L288 224l52.2-10.4c-2.6-3.9-4.2-8.5-4.2-13.6c0-13.3 10.7-24 24-24s24 10.7 24 24c0 13-10.3 23.6-23.2 24L304.5 349.1c-5.2 11.5-16.6 18.9-29.2 18.9l-102.6 0c-12.6 0-24-7.4-29.2-18.9L87.2 224C74.3 223.6 64 213 64 200c0-13.3 10.7-24 24-24s24 10.7 24 24c0 5-1.5 9.7-4.2 13.6L160 224l53.1-46.4c-8.9-4.1-15-13.1-15-23.6c0-14.4 11.6-26 26-26s26 11.6 26 26c0 10.5-6.2 19.5-15.1 23.6z"/>
                    </svg>
                </div>
                <div class="persone__icon">
                    <img v-if="userIcon !== ''" src="" alt="">
                    <h3 v-else>{{ userName[0] }}</h3>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    props: ['nav_attr', 'btn_name'],
    data() {
        return {
            toPage: 'Главная'
        }
    },
    computed: {
        userName() {
            return this.$store.getters.getUserName;
        },
        userIcon() {
            return this.$store.getters.getUserIcon;
        }
    }
}
</script>

<style lang="scss" scoped>
$main-color: rgb(210, 210, 210);

.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 15px 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 99;
    background-blend-mode: multiply;
    background: transparent;
    background-color: rgba(42, 37, 64, 0.3);
    box-shadow: 0 0 4px white;

    .header__logo {
        
        .logo__text {
            user-select: none;
            color: $main-color;

            h2 {
                font-size: 2em;
                font-weight: 800;
            }

            p {
                font-size: 0.8em;
            }
        }
    }

   .header__tools {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

        .tools__persone {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 30px;

            .persone__search {
                position: relative;

                input {
                    width: 280px;
                    outline: none;
                    padding: 6px 35px 6px 10px;
                    font-size: 15px;
                    letter-spacing: 1px;
                    background: transparent;
                    border-radius: 10px;
                    color: $main-color;
                }

                button {
                    cursor: pointer;
                    background: transparent;
                    border: none;
                    outline: none;
                    position: absolute;
                    top: 4px;
                    right: 10px;
                    transition: rotate 0.5s ease;
                    transform-origin: center;

                    &:hover {
                        rotate: 30deg;
                    }

                    svg {
                        width: 20px;
                        height: auto;
                    }
                }
            }
            
            .persone__name {
                font-size: 1.5em;
                color: $main-color;
            }

            .persone__vidget {
                cursor: pointer;

                svg {
                    width: 25px;
                    height: auto;
                }
            }


            .persone__icon {
                cursor: pointer;
                width: 45px;
                height: 45px;
                border-radius: 50%;
                border: 2px solid rgb(0, 0, 0);
                display: flex;
                justify-content: center;
                align-items: center;
                background: transparent;
                backdrop-filter: blur(20px);
                transition: transform 0.6s ease;

                &:hover {
                    transform: rotate(360deg);
                }


                h3 {
                    font-size: 20px;
                    font-weight: 900;
                    color: $main-color;
                }
            }
        }
   }
}
</style>