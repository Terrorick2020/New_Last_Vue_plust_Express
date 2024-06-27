<template>
    <div class="info">
        <div class="info__conteiner">
            <div class="conteiner__text">
                <h2>Правила сайта</h2>
                <ul>
                    <li>Добро пожаловать на самый безопасный сайт в интернете! Да да, я не шучу... Можете проверить это, правда можно получить ответочку, ну если так хочется, то вперёд.</li>
                    <li>Зачем нужен этот сайт? Только здесь вы сможете найти магически книги..</li>
                </ul>
            </div>
            <div class="conteiner__pet">
                <img src="../../assets/my_pet.png" alt="pet" class="pet__persone">
                <img src="../../assets/sms_block.png" alt="sms" class="pet__sms">
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.info {
    position: relative;
    width: 100%;

    .info__conteiner {
        position: relative;
        margin-top: 200px;
        display: flex;
        flex-direction: column;

        .conteiner__text {
            margin-top: 50px;
            width: 50%;

            h2 {
                font-size: 2em;
            }

            ul {
                
                li{
                    margin-top: 20px;
                    font-size: 20px;
                }
            }
        }

        .conteiner__pet {
            position: absolute;
            right: 200px;
            top: 50px;

            .pet__persone {
                width: 380px;
                height: auto;
            }

            .pet__sms {
                width: 400px;
                height: auto;
                position: absolute;
                top: -100px;
                right: -200px;
            }
        }
    }
}
</style>