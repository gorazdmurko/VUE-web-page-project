<template>
    <div id="games">
        <img @click="$emit('add-Game', game.id)" :src="game.thumbnail" alt="no pic">
        <!-- <img @click="addGame(game.id)" :src="game.thumbnail" alt="no pic"> -->
    </div>
</template>

<script>
    export default {
        name: 'Game2Add',
        props: {
            game: Object
        },
        emits: ['add-Game'],
        // methods: {
        //     addGame(id) {
        //         this.$emit('add-Game', id);
        //     }
        // }
    }
</script>

<style scoped>
div {
    /* margin-top: 10vh; */
    border: 2px solid darkgray;
    position: relative;
    /* min-height: 15vh;
    min-width: 10vw; */
    width: 10vw;
    height: 15vh;
    display: inline-flex;
}
img {
    width: 10vw;
    height: 15vh;
    /* max-width: 15vh;
    max-height: 15vh;
    min-height: 15vh;
    min-width: 10vw; */
    position: absolute;
}
img:hover {
    border: 3px solid yellow;
    width: 11vw;
}

.fas {
    color: rgb(147, 82, 231);
    cursor: pointer;
}
</style>