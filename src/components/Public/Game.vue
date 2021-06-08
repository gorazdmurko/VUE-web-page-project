<template>
    <div :class="[singleGame.forTrade ? 'forTrade' : '', 'singleGame']">
        <!-- router link on picture -->
        <router-link :to="{ name: 'GameDetails',
                            params: {
                                image: singleGame.thumbnail,
                                id: singleGame.id,
                                name: singleGame.name,
                                minPlayers: singleGame.minPlayers,
                                maxPlayers: singleGame.maxPlayers,
                                playingTime: singleGame.playingTime,
                                yearPublished: singleGame.yearPublished,
                                averageRating: singleGame.averageRating,
                                forTrade: singleGame.forTrade,
                            }}">      <!-- dynamic link -->
            <img class="pic" :src="singleGame.thumbnail" />
        </router-link>
        <h3>
            {{ singleGame.name }}, ID: {{ singleGame.id }}
        </h3>
        <!-- https://cdnjs.com/ -- font awesome -- paste link tag in ./public/index.html -->
        <i @click="infoPage(singleGame.id)" class="far fa-arrow-alt-circle-right fa-2x"></i>    <!-- // Sizing Icons - Font Awesome -->
    </div>
</template>

<script>
export default {
    name: 'singleGame',
    props: {
        singleGame: Object,
    },
    methods: {
        infoPage(id) {
            this.$emit('info-page', id)
        }
    },
}
</script>

<style>
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
  max-width: 35vw;
  min-width: 35vw;
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