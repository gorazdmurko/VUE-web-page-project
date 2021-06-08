/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
<template>
  <div class="home">
    <section class="underNavigation">
      <h2>Home View</h2>
      <br>
      <!-- <img alt="no pic" src="@/assets/pic5786795.png" /> -->
      <img id="img" :src="picture" alt="no picture">
      <h2>BOARD GAMES GALAXY</h2>
      <br>
    </section>
  </div>

  <!-- from here to eternety -->
  <div id="center">
    <div id="left">
    <Games @info-page="infoPage" :games="someGames"/>   <!-- v-bind games to someGames data -->
    </div>
    <div id="right">
      <!-- POSITION - FLEX - GRID !! -->
      <!-- POSITION - FLEX - GRID !! -->
      <!-- POSITION - FLEX - GRID !! -->
    </div>
  </div>
  <!-- from here to eternety -->

  <Redirect id="redir" />
</template>

<script>
// @ is an alias to /src
import Games from '../../components/Public/Games'
import { games as games } from '../../data/JS/someGames_backend.js' // ce server ne dela
import Redirect from '@/components/Public/Redirect'

export default {
  name: "Home",
  components: {
    Games,
    // Navigation,
    Redirect
  },
  data() {
    return {
      someGames: [],
      games: this.$store.state.someGames,
      picture: Image
    }
  },
  methods: {
    changePic() {
      setInterval(() => {
        let num = Math.floor(Math.random() * 10);
        this.picture = this.someGames[num].thumbnail;
      }, 1000)
    },
    infoPage(gameId) {
      if (confirm(`MORE INFO FOR GAME w/ID ${gameId}?`)) {
        console.log(`id: ${gameId}`)
        window.open(`https://boardgamegeek.com/boardgame/${gameId}`, '_blank');
      }
    },
    async fetchGames() {
      const res = await fetch('api/someGames');
      const data = await res.json();
      console.log("From server: ", data);
      return data;
    },
    async fetchOneGame(id) {
      const res = await fetch(`api/someGames/${id}`);
      const data = await res.json();
      return data;
    },
  },
  mounted() {
    this.changePic();
    // console.log("someGames from mounted: ", this.someGames); // empty!??
  },
  async created() {
    console.clear();
    try {
      // this.someGames = this.$store.state.someGames;  // kelner prepozen !!
      this.someGames = await this.fetchGames();
      console.log("From Proxy: ", this.someGames);
      this.picture = this.someGames[0].thumbnail;
    } catch {
      if (this.someGames.length === 0) {
        console.log('Loading from .js file...');  // kontrola -> ce imamo server, ne sme nalagat od tukaj
        if (!localStorage.games) {
          localStorage.games = JSON.stringify(games);
          this.someGames = JSON.parse(localStorage.games);
          console.table(this.someGames);
        } else {
          console.clear();
          this.someGames = JSON.parse(localStorage.games);
          this.someGames.forTrade = this.rand(this.someGames);
          console.table(this.someGames);
        }
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch('fetchSomeGames');
    this.$store.dispatch('fetchMoreGames');
    this.$store.dispatch('fetchGamesForSale');
    this.$store.dispatch('fetchUsers');
    this.$store.dispatch('fetchHottestGames');
  }
};
</script>

<style scoped>
#img{
  width: 12vw;
  height: 11vw;
}
  #left {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* grid-template-rows: 2fr 2fr; */
  }
  #redir {
    margin-top: 7vh;
  }
  .navigation {
      position: fixed;
      top: 0;
      width: 100%;
      overflow: hidden;
      background-color: #040413;
  }

  .underNavigation {
      margin-top: 18vh;
  }
</style>