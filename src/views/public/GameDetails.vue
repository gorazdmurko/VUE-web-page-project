<template>
    <div>
        <h1>Game Details</h1>
        <h2>{{ name }}</h2>
        <img :src="image" />
        <p>Year published: {{ yearPublished }}</p>
        <p>Game Id is: {{ id }}</p>
        <p>Playing Time: {{ time }}</p>
        <p>Rating: {{ rating }}</p>
        <p>Available: {{ available }}</p>
        <p>Min. Players: {{ $route.params.minPlayers }}</p>
        <p>Max. Players: {{ $route.params.maxPlayers }}</p>
        <router-link :to="{ name: 'Home' }"><button>BACK</button></router-link>
    </div>
    <Redirect />
</template>

<script>
    import Redirect from '@/components/Public/Redirect'
    export default {
        name: 'GameDetails',
        components: {
            Redirect,
        },
        // namesto da pisemo direktno -> {{ $route.params.id }}c -> si lahko pomagamo z 'props' ali 'data' !! !!
        props: ['name', 'yearPublished', 'id' ],
        // ali tako
        data() {
            return {
                // name: this.$route.params.name,
                // yearPublished: this.$route.params.yearPublished,
                // id: this.$route.params.id,
                time: this.$route.params.playingTime,
                rating: this.$route.params.averageRating,
                available: this.$route.params.forTrade,
                image: this.$route.params.image
            }
        }
    }
</script>

<style scoped>
button {
  color:yellow;
  font-weight: bold;
  font-size: 1em;
  margin-top: 20px;
  padding: 9px 25px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  background-color: rgb(10, 74, 128);
}
div {
    margin-top: 20vh;
}
redirect {
    margin-top: none;
}
</style>