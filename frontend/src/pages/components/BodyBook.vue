<template>
    <div class="book-body">
        <div class="book-body__text">
            <h1>{{ getTitleTargetBook }}</h1>
            <hr>
            <h6>"{{ getDiscriptionTargetBook }}"</h6>
            <hr>
            <pre>{{ getTextTargetBook }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        getTitleTargetBook() {
            return this.$store.getters.getTitleTargetBook
        },
        getDiscriptionTargetBook() {
            return this.$store.getters.getDiscriptionTargetBook
        },
        getTextTargetBook() {
            return this.$store.getters.getTextTargetBook
        }
    }
}
</script>

<style lang="scss" scoped>
.book-body {
    margin-top: 250px;

    .book-body__text {
        border-radius: 10px;
        padding: 10px 20px 30px 20px;
        border: 2px solid black;
        background-blend-mode: multiply;
        background: rgba(255, 255, 255, 0.75);

        h1 {
            font-size: 50px;
            text-align: center;
            text-decoration: underline;
            letter-spacing: 2px;
            margin-bottom: 10px;
        }

        h6 {
            margin-top: 20px;
            font-size: 20px;
            padding-bottom: 10px;
        }

        pre {
            margin-top: 50px;
            font-size: 15px;
            text-wrap: wrap;
            
        }
    }
}
</style>