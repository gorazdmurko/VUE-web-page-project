<template>
    <div id="games" v-for="game in games" :key="game.id">
        <Game2Remove @remove-Game="$emit('remove-Game', game.id)" :game="game" />
    </div>
</template>

<script>
import Game2Remove from './Game2Remove'
    export default {
        name: 'Games2Remove',
        components: {
            Game2Remove
        },
        props: {
            games: Array
        },
        emits: ['remove-Game']
    }
</script>

<style scoped>

</style>