<template>
    <div class="singleGame  ">
        <!-- router link on picture -->
        <!-- <router-link :to="{ name: 'privateGameDetails',
                            params: {
                                image: singleGame.thumbnail,
                                id: singleGame.id,
                                name: singleGame.name,
                                minPlayers: singleGame.minPlayers,
                                maxPlayers: singleGame.maxPlayers,
                                playingTime: singleGame.playingTime,
                                yearPublished: singleGame.yearPublished,
                                averageRating: singleGame.averageRating,
                                forTrade: singleGame.forTrade, }
                            }">      dynamic link -->
        <router-link :to="{ name: 'privateGameDetails', params: { gameName: singleGame.name, gameId: singleGame.id } }">
            <img @click="emitData" class="pic" :src="singleGame.thumbnail" />
        </router-link>
        <h3>{{ singleGame.name }}</h3>
        <h2>PRICE: {{ singleGame.price }}€</h2>
        <i @click="$emit('info', singleGame.price)" class="far fa-arrow-alt-circle-right fa-2x"></i>
    </div>
</template>

<script>
export default {
    name: 'singleGame',
    props: {
        singleGame: Object,
        gameName: String,
        gameId: String
    },
    methods: {
        emitData() {
            this.$store.state.currentGame = this.singleGame
        }
    },
    emits: ['info', 'emitData']
}
</script>

<style scoped>
div {
    position: relative;
}
h2 {
    max-width: 5wh;
    position: absolute;
    right: 4vw;
}
h3 {
    /* border: 2px solid black; */
    max-width: 17vw;
    min-width: 20vh;
    position: absolute;
    padding: 1vh 8vh;
    left: 9vw;
    /* text-align: center; */
}
.fas {
    color: red;
}
.far {
    color: rgb(147, 82, 231);
    cursor: help;
}
.singleGame.forTrade {
    /* border-left: 5px solid green; */
    border-left: 5px solid yellow;
}
.singleGame {
    border-radius: 1vw;
  max-width: 40vw;
  min-width: 40vw;
  max-height: 10vh;
  min-height: 10vh;
  display: inline-flex;
  /* position: center; */
  /* align-items: right; */
  background: #9182327c;
  margin: 5px;
  padding: 10px 20px;
  cursor: default;
  justify-content: space-between;
}
.singleGame:hover {
    background-color:rgba(68, 71, 68, 0.781);
}
.singleGame h3 {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
}
img {
    cursor: pointer;
}
</style>