<template>
    <div class="wrapper">
        <div class="conteiner">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Playwrite+NG+Modern:wght@100..400&display=swap');

::selection {
    background-color: rgb(62, 170, 107);
    color: white;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-size: 1em;
    font-family: "Playwrite NG Modern", cursive;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
}

a {
    transition: all 0.6 ease;
    text-decoration: none;
    font-size: 1.1em;
    color: rgb(198, 198, 198);
    font-weight: 500;
    cursor: pointer;
}
</style>