<template>
    <div class="error">
        <div class="error__text">
            <h2>Ошибка <span>403</span></h2>
            <p>Кто-то сунул нос куда не просят...</p>
        </div>
        <div class="error__pet">
            <img class="pet" src="../assets/my_pet.png" alt="pet">
            <img class="msg" src="../assets/error_sms.png" alt="msg">
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.error {
    position: relative;
    background-image: url('../assets/background_reg_log.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: multiply;
    background-color: rgba(0, 0, 0, 0.25);
    min-height: 100lvh;
    padding: 10%;

    .error__text {
        h2 {
            font-size: 3.2em;
            font-weight: 900;
        }
    }

    .error__pet {
        position: absolute;
        top: 20%;
        right: 10%;

        .pet {
            width: 400px;
            height: auto;
        }

        .msg {
            width: 400px;
            height: auto;
            position: relative;
            top: -200px;
            right: 200px;
        }
    }
}
</style>