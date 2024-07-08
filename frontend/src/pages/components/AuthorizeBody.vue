<template>
    <div class="authorization">
        <div class="authorization__form log-form" ref="loginForm" v-show="isLoginForm">
            <h2>Вход</h2>
            <form class='form__box'>
                <div class="input-box">
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"/>
                        </svg>
                    </span>
                    <input type="text" v-model="login_input" @focus="onLoginFocus" @blur="handBlurLogin" id="user_login" name="user_login">
                    <lable for="user_login" :style="label_login_top">Логин</lable>
                </div>
                <div class="input-box">
                    <span class="icon lock" v-if="!pswdIsVisible" @click="changeVisible">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M376 186h-20v-40c0-55-45-100-100-100S156 91 156 146v40h-20c-22.002 0-40 17.998-40 40v200c0 22.002 17.998 40 40 40h240c22.002 0 40-17.998 40-40V226c0-22.002-17.998-40-40-40zM256 368c-22.002 0-40-17.998-40-40s17.998-40 40-40 40 17.998 40 40-17.998 40-40 40zm62.002-182H193.998v-40c0-34.004 28.003-62.002 62.002-62.002 34.004 0 62.002 27.998 62.002 62.002v40z"/>
                        </svg>
                    </span>
                    <span class="icon lock" v-else  @click="changeVisible">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M376 186h-20v-40c0-55-45-100-100-100S156 91 156 146h37.998c0-34.004 28.003-62.002 62.002-62.002 34.004 0 62.002 27.998 62.002 62.002H318v40H136c-22.002 0-40 17.998-40 40v200c0 22.002 17.998 40 40 40h240c22.002 0 40-17.998 40-40V226c0-22.002-17.998-40-40-40zM256 368c-22.002 0-40-17.998-40-40s17.998-40 40-40 40 17.998 40 40-17.998 40-40 40z"/>
                        </svg>
                    </span>
                    <input :type="pswdIsVisible ? 'text' : 'password'" v-model="pswd_input" @focus="onPswdFocus" @blur="handBlurPswd" id="user_pswd" name="user_pswd">
                    <lable for="user_pswd" :style="label_pswd_top">Пароль</lable>
                </div>
                <div class="remeber-forgot">
                    <label for="remember">
                        <input type="checkbox" v-model="remember_me" id="remember" name="remember">
                        Запомнить меня
                    </label>
                    <a>Забыли пароль?</a>
                </div>
                <button type="button" class="box__btn">Войти</button>
                <div class="box__log-reg">
                    <p>Ещё нет аккаунта?</p>
                    <a @click="openRegForm">Зарегистрироваться!</a>
                </div>
            </form>
        </div>
        <div class="authorization__form reg-form" ref="regForm" v-show="!isLoginForm">
            <h2>Регистрация</h2>
            <form class='form__box'>
                <div class="input-box">
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 256c52.805 0 96-43.201 96-96s-43.195-96-96-96-96 43.201-96 96 43.195 96 96 96zm0 48c-63.598 0-192 32.402-192 96v48h384v-48c0-63.598-128.402-96-192-96z"/>
                        </svg>
                    </span>
                    <input type="text" v-model="login_input" @focus="onLoginFocus" @blur="handBlurLogin" id="user_login" name="user_login">
                    <lable for="user_login" :style="label_login_top">Логин</lable>
                </div>
                <div class="input-box">
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"/>
                        </svg>
                    </span>
                    <input type="email" v-model="email_input" @focus="onEmailFocus" @blur="handBlurEmail" id="user_email" name="user_email">
                    <lable for="user_email" :style="label_email_top">Почта</lable>
                </div>
                <div class="input-box">
                    <span class="icon lock" v-if="!pswdIsVisible" @click="changeVisible">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M376 186h-20v-40c0-55-45-100-100-100S156 91 156 146v40h-20c-22.002 0-40 17.998-40 40v200c0 22.002 17.998 40 40 40h240c22.002 0 40-17.998 40-40V226c0-22.002-17.998-40-40-40zM256 368c-22.002 0-40-17.998-40-40s17.998-40 40-40 40 17.998 40 40-17.998 40-40 40zm62.002-182H193.998v-40c0-34.004 28.003-62.002 62.002-62.002 34.004 0 62.002 27.998 62.002 62.002v40z"/>
                        </svg>
                    </span>
                    <span class="icon lock" v-else @click="changeVisible">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M376 186h-20v-40c0-55-45-100-100-100S156 91 156 146h37.998c0-34.004 28.003-62.002 62.002-62.002 34.004 0 62.002 27.998 62.002 62.002H318v40H136c-22.002 0-40 17.998-40 40v200c0 22.002 17.998 40 40 40h240c22.002 0 40-17.998 40-40V226c0-22.002-17.998-40-40-40zM256 368c-22.002 0-40-17.998-40-40s17.998-40 40-40 40 17.998 40 40-17.998 40-40 40z"/>
                        </svg>
                    </span>
                    <input :type="pswdIsVisible ? 'text' : 'password'" v-model="pswd_input" @focus="onPswdFocus" @blur="handBlurPswd" id="user_pswd" name="user_pswd">
                    <lable for="user_pswd" :style="label_pswd_top">Пароль</lable>
                </div>
                <div class="remeber-forgot">
                    <label for="remember">
                        <input type="checkbox" v-model="remember_me" id="remember" name="remember">
                        Запомнить меня
                    </label>
                    <a>Генерация пароль!</a>
                </div>
                <button @click="addUserInSys" type="button" class="box__btn">Зарегистрироваться</button>
                <div class="box__log-reg">
                    <p>Уже есть аккаунт?</p>
                    <a @click="openLogForm">Войти!</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import CryptoJS from 'crypto-js';


export default {
    data() {
        return {
            login_input: '',
            email_input: '',
            pswd_input: '',
            remember_me: false,
            label_email_top: '',
            label_pswd_top: '',
            label_login_top: '',
            pswdIsVisible: false,
            isLoginForm: false
        }
    },
    methods: {
        onLoginFocus() {
            this.label_login_top = 'top: -5px';
        },
        onEmailFocus() {
            this.label_email_top = 'top: -5px';
        },
        onPswdFocus() {
            this.label_pswd_top = 'top: -5px';
        },
        handBlurLogin () {
            if( this.login_input === '' ) this.label_login_top = '';
        },
        handBlurEmail () {
            if( this.email_input === '' ) this.label_email_top = '';
        },
        handBlurPswd () {
            if( this.pswd_input === '' ) this.label_pswd_top = '';
        },
        changeVisible() {
            this.pswdIsVisible = !this.pswdIsVisible;
        },
        openRegForm() {
            this.$refs.loginForm.classList.remove('animationDisplay');
            this.$refs.loginForm.classList.add('animationNone');
            setTimeout( () => {
                this.$refs.regForm.classList.remove('animationNone');
                this.isLoginForm = false;
                this.$refs.regForm.classList.add('animationDisplay');
            }, 2000 )
        },
        openLogForm() {
            this.$refs.regForm.classList.remove('animationDisplay');
            this.$refs.regForm.classList.add('animationNone');
            setTimeout( () => {
                this.$refs.loginForm.classList.remove('animationNone');
                this.isLoginForm = true;
                this.$refs.loginForm.classList.add('animationDisplay');
            }, 2000 )
        },
        async addUserInSys() {
            const hash = CryptoJS.SHA256( this.pswd_input );

            const payload = {
                login: this.login_input,
                email: this.email_input,
                pswd: hash.toString(CryptoJS.enc.Hex)
            }

            await this.$store.dispatch( 'addUser', payload );
            
            if( this.$store.getters.getAuthStatus ) {
                this.$router.push('/client')
            }
        },
        async logUserInSys() {
            const hash = CryptoJS.SHA256( this.pswd_input );

            const payload = {
                login: this.login_input,
                pswd: hash.toString(CryptoJS.enc.Hex)
            }

            await this.$store.dispatch( 'identificationUser', payload );

            if( this.$store.getters.getAuthStatus ) {
                this.$router.push('/client')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@keyframes rotateAndNone {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(90deg);
      opacity: 0;
    }
}

@keyframes rotateAndDisplay {
    0% {
      transform: rotateY(90deg);
      opacity: 0;
    }
    100% {
      transform: rotateY(0deg);
      opacity: 1;
    }
}

.animationNone {
animation-name: rotateAndNone;
animation-duration: 2s;
animation-fill-mode: forwards;
}

.animationDisplay {
animation-name: rotateAndDisplay;
animation-duration: 2s;
animation-fill-mode: forwards;
}

.authorization { 
    display: flex;
    justify-content: center;
    align-items: center;

    .authorization__form {
        position: relative;
        width: 420px;
        height: 500px;
        background: transparent;
        border:  2px solid rgba(255, 255, 255, .5);
        border-radius: 20px;
        backdrop-filter: blur(20px);
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
        margin: 300px 0;
        padding: 20px 0;
        transition: all 4s ease;

        &.reg-form {
            height: 540px;
        }


        h2 {
            width: 100%;
            font-size: 2em;
            font-weight: 600;
            text-align: center;
        }

        .form__box {
            width: 100%;
            padding: 0 30px;
            margin-top: 50px;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;

            .input-box {
                position: relative;
                width: 100%;
                height: 50px;
                border-bottom: 2px solid black;

                .icon {
                    position: absolute;
                    right: 8px;
                    font-size: 1.2em;

                    &.lock {
                        cursor: pointer;
                    }

                    svg {
                        width: 20px;
                        height: auto;
                    }
                }

                input {
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    border: none;
                    outline: none;
                    transition: all 0.5s ease;
                    padding-right: 35px;
                }

                lable {
                    position: absolute;
                    top: 40%;
                    left: 5px;
                    transform: translateY(-50%);
                    font-size: 1em;
                    color: black;
                    font-weight: 500;
                    transition: all 0.5s ease;
                }
            }

            .remeber-forgot {
                width: 100%;
                display: flex;
                justify-content: space-between;
                transition: all 0.5s ease;

                label {

                    input {
                        cursor: pointer;
                        translate: 0 2px;
                        scale: 1.3;
                        margin-right: 10px;
                    }
                }

                a {
                    font-size: 1em;

                    &:hover {
                        color: #fff;
                        text-decoration: underline;
                        letter-spacing: 1px;
                    }
                }
            }

            .box__btn {
                margin-top: 10px;
                width: 80%;
                padding: 8px 0;
                cursor: pointer;
                border-radius: 10px;;
                background: transparent;
                transition: all 0.5s ease;
                font-size: 1.1em;

                &:hover {
                    scale: 1.05;
                    translate: 3px -3px;
                    color: #29755c;
                }
            }

            .box__log-reg {
                font-size: 0.95em;
                margin-top: 20px;
                width: 100%;
                display: flex;
                justify-content: start;
                gap: 10px;
                align-items: center;

                a {
                    &:hover {
                        color: #fff;
                        text-decoration: underline;
                        letter-spacing: 1px;
                    }
                }
            }
        }
    }
}
</style>