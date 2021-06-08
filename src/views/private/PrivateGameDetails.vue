<template>
    <!-- <sup>{{ userFirst }}  {{ userLast }}</sup> -->
    <div>
        <h1>Game Details</h1>
        <h2>{{ name }}</h2>
        <img :src="image" />
        <p>Year published: {{ yearPublished }}</p>
        <p>Game Id is: {{ id }}</p>
        <p>Playing Time: {{ time }}</p>
        <p>Rating: {{ rating }}</p>
        <p>Available: {{ available }}</p>
        <!-- <p>Min. Players: {{ $route.params.minPlayers }}</p> -->
        <!-- <p>Max. Players: {{ $route.params.maxPlayers }}</p> -->
        <p>Min. Players: {{ minPlayers }}</p>
        <p>Max. Players: {{ maxPlayers }}</p>
    </div>
    <Redirect />
</template>

<script>
    import Redirect from '../../components/Public/Redirect'
    export default {
        name: 'PrivateGameDetails',
        components: {
            Redirect
        },
        props: {
            gameName: String,   // ker jih prenesem iz router-ja
            gameId: String      //
        },
        data() {
            return{
                userFirst: this.$store.state.currentUserFirstName,
                userLast: this.$store.state.currentUserLastName,
                name: this.$store.state.currentGame.name,
                image: this.$store.state.currentGame.thumbnail,
                yearPublished: this.$store.state.currentGame.yearPublished,
                id: this.$store.state.currentGame.id,
                time: this.$store.state.currentGame.playingTime,
                rating: this.$store.state.currentGame.rating,
                available: this.$store.state.currentGame.forTrade,
                minPlayers: this.$store.state.currentGame.minPlayers,
                maxPlayers: this.$store.state.currentGame.maxPlayers,
            }
        },
    }
</script>

<style scoped>
button {
  margin-top: 5vh;
  margin-bottom: 5vh;
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
</style>