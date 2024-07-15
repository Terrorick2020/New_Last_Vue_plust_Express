<template>
    <footer class="footer">
        <div class="footer__body">
            <p>Все права защищены! &COPY;</p>
        </div>
    </footer>
</template>

<script>
export default {
    data() {

    }
}
</script>

<style lang="scss" scoped>
.footer {
    margin-top: 70px;
    display: flex;
    justify-content: center;
    position: relative;

    .footer__body {
        height: 80px;
        text-align: center;
        width: 80%;

        p {
            color: rgb(228, 228, 228);
        }
    }
}
</style>