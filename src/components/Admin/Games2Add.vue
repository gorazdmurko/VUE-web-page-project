<template>
    <div id="games" v-for="game in games" :key="game.id">
        <Game2Add @add-Game="$emit('add-Game', game.id)" :game="game" />
    </div>
</template>

<script>
import Game2Add from './Game2Add'
    export default {
        name: 'Games2Add',
        components: {
            Game2Add
        },
        props: {
            games: Array
        },
        emits: ['add-Game']
    }
</script>

<style scoped>

</style>