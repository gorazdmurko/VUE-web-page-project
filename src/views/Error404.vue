<template>
    <div id="message">
        <h2>404</h2>
        <h3>Page not found</h3>
        <router-link :to="{ name: 'Home' }"><button>BACK</button></router-link>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
#message {
    margin-top: 30vh;
    margin-bottom: auto;
}
h2, h3 {
    font-size: 5vh;
}
button {
    color: black;
    font-weight: bold;
    background-color: olivedrab;
    border-radius: 10px;
    min-height: 5vh;
    min-width: 9vh;
}
</style>