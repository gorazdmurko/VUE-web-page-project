<template>
    <div :key="game.id" v-for="game in games">
        <button @click="$emit('addToBasket', game.id)" class="dir"><i class="fas fa-shopping-basket fa-2x" style="color: Mediumslateblue"></i></button>
        <Game @info="$emit('info', game.price)" @emitData="'emitData'" :singleGame="game" />     <!-- v-bind singleGame with game data -->
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
    emits: ['info', 'addToBasket', 'emitData'],
    methods: {
        // toBasket(id) {
        //     this.$emit('toBasket', id);
        // }
    }
}
</script>

<style>
.pic {
    max-height: 10vh;
    max-width: 10vw;
}
</style>