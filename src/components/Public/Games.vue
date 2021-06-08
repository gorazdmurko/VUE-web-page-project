<template>
    <div :key="game.id" v-for="game in games">
        <!-- <router-link :to="{ name: 'GameDetails', params: { id: game.id } }"> -->
        <Game @info-page="$emit('info-page', game.id)" :singleGame="game" />     <!-- v-bind singleGame with game data -->
        <!-- </router-link> -->
    </div>
</template>

<script>
import Game from './Game'

export default {
    name: 'Games',
    props: {
        games: Array,
    },
    components: {
        Game,
    },
    emits: ['info-page'],
}
</script>

<style>
.pic {
    max-height: 10vh;
    max-width: 10vw;
}
</style>