<template>
  <div class="home">
    <!-- <section class="navigation">
      <Navigation />
    </section> -->
    <section class="underNavigation">
      <h2>Game View</h2>
      <br>
      <!-- <img alt="billiard-balls" src="../../assets/kisspng-mensch-rgere-dich-nicht-ludo-risk-board-game-board-game-5b101f25c4de93.2467739415277832058064.png" /> -->
    </section>
  </div>
  <div>
    <h1>HELLO USER</h1>
    <!-- <h1>{{ name }}</h1> -->
    <img class="pic" :src="picture" alt="nothing">
    <h3>Falls Sie nicht angemeldet sind, können Sie leider die demo Spielchen nich spielen</h3>
    <br>
  </div>
  <div>
    <img class="allGames" src="..\..\assets\pic1172132.png" />
    <img class="allGames" src="..\..\assets\pic3536616.png" />
    <img class="allGames" src="..\..\assets\pic2761491.png" />
    <img class="allGames" src="..\..\assets\pic5375624.png" />
    <img class="allGames" src="..\..\assets\pic5786795.png" />
    <img class="allGames" src="..\..\assets\pic4325841.png" />
    <img class="allGames" src="..\..\assets\pic2945432.png" />
    <img class="allGames" src="..\..\assets\pic3066125.png" />
  </div>
  <div>
    <Redirect id="redir" />
  </div>
</template>

<script>
// import Navigation from '../../components/Public/Navigation'
import Redirect from '@/components/Public/Redirect'

export default {
  name: "Igre",
  components: {
    // Navigation,
    Redirect,
  },
  data() {
    return {
      allGames: [],
      num: Number,
      // image: this.allGames[this.num].thumbnail
      name: String,
      picture: Image,
    }
  },
  methods: {
    changePics() {
      setInterval(() => {
        this.num = Math.floor(Math.random() * 544);
        this.name = this.allGames[this.num].name
        this.picture = this.allGames[this.num].thumbnail
      }, 1200);
      // this.changeNum();
      // console.log(this.num);
    },
    async getGames() {
      const prom = fetch('api/moreGames');
      const res = await prom;
      const data = res.json();
      return data;
    }
  },
  async mounted() {
    this.allGames = await this.getGames();
    let rnd = Math.floor(Math.random() * 500);
    this.picture = this.allGames[rnd].thumbnail;
    this.changePics();
  },
  computed: {
    changeNum() {
      return this.num;
    }
  }
}
</script>

<style scoped>
.pic {
  min-height: 16vh;
  max-height: 16vh;
  /* min-width: 27vw; */
  /* max-width: 43.2vw; */
}
#redir {
  margin-top: 5vh;
}
.allGames {
  margin-left: 2vw;
  margin-right: 2vw;
  /* justify-content: space-between; */
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
</style>>
