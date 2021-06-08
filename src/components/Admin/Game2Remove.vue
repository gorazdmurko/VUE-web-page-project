<template>
    <div id="games">
        <img @click="$emit('remove-Game', game.id)" :src="game.thumbnail" alt="no pic">
        <!-- <img @click="removeGame(game.id)" :src="game.thumbnail" alt="no pic"> -->
    </div>
</template>

<script>
    export default {
        name: 'Game2Remove',
        props: {
            game: Object
        },
        emits: ['remove-Game'],
        // methods: {
        //     removeGame(id) {
        //         this.$emit('remove-Game', id);
        //     }
        // }
    }
</script>

<style scoped>
div {
    /* margin-top: 10vh; */
    border: 2px solid darkgray;
    position: relative;
    min-height: 15vh;
    min-width: 10vw;
    display: inline-flex;
}
img {
    max-width: 15vh;
    max-height: 15vh;
    position: absolute;
    min-height: 15vh;
    min-width: 10vw;
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