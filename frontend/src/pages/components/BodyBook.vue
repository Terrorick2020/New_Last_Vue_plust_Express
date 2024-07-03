<template>
    <div class="book-body">
        <div class="book-body__text">
            <h1>{{ getTitleTargetBook }}</h1>
            <h6>{{ getDiscriptionTargetBook }}</h6>
            <p>{{ getTextTargetBook }}</p>
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

}
</style>