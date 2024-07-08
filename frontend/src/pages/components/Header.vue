<template>
    <header class="header">
        <div class="header__logo">
            <div class="logo__img">
                <img src="" alt="">
            </div>
            <div class="logo__text">
                <h2>MagcikLab</h2>
                <p>Самый безопасный сайт!</p>
            </div>
        </div>
        <div class="header__navigation">
            <nav class="nav">
                <a href="#" v-for="(elem, index) in nav_attr">{{ elem.name }}</a>
                <router-link :to="btn_name.path" class="routes">
                    <button>{{ btn_name.name }}</button>
                </router-link>
            </nav>
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
    }
}
</script>

<style lang="scss" scoped>
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
    background-color: rgba(42, 36, 65, 0.3);
    box-shadow: 0 0 4px white;

    .header__logo {
        
        .logo__text {
            user-select: none;
            color: rgb(200, 200, 200);

            h2 {
                font-size: 2em;
                font-weight: 800;
            }

            p {
                font-size: 0.8em;
            }
        }
    }

    .header__navigation {

        .nav {

            a {
                position: relative;
                margin-left: 40px;
                transition: all .6s ease;


                &::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -3px;
                    width: 100%;
                    height: 3px;
                    border-radius: 10px;
                    background: #fff;
                    transform: scaleX(0);
                    transition: transform 0.5s ease;
                }

                &.routes {
                    &::after {
                        display: none;
                    }
                }

                &:hover {
                    color: #fff;
                    scale: 1.03;
                    letter-spacing: 1.1px;
                    translate: 2px -3px;

                    &::after {
                        transform: scaleX(1);
                        transform-origin: left;
                    }
                }
            }

            button {
                cursor: pointer;
                padding: 5px 8px;
                background: transparent;
                border: 2px solid rgb(198, 198, 198);
                height: 50px;
                border-radius: 10px;
                font-size: 1.1em;
                color: rgb(198, 198, 198);
                font-weight: 500;
                margin-left: 40px;
                transition: all .6s ease;

                &:hover {
                    background: #fff;
                    color: rgb(48, 130, 74);
                    scale: 1.04;
                    translate: 2px -3px;
                    border-color: #fff;
                }
            }
        }
    }
}
</style>