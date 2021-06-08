/* eslint-disable prettier/prettier */
<template>
<!-- <section class="navigation">
  <Navigation />
</section> -->
  <div class="home">
    <section class="underNavigation">
      <h2>Profile View</h2>
      <br>
      <img :src="image" alt="no pic." />
      <!-- <img alt="billiard-balls" src="../../assets/kisspng-mensch-rgere-dich-nicht-ludo-risk-board-game-board-game-5b101f25c4de93.2467739415277832058064.png" /> -->
    </section>
  </div>
  <div>
    <h2>Herzlich Willkommen</h2>
    <h3>Keine Daten: Sie sind gerade nicht angemeldet</h3>
  </div>
  <div>
    <Redirect id="redir" />
  </div> 
</template>

<script>
// import Navigation from '../../components/Public/Navigation'
import Redirect from '@/components/Public/Redirect'

export default {
  name: "Profile",
  components: {
    // Navigation,
    Redirect,
  },
  data() {
    return {
      image: this.$route.params.img
    }
  }
};
</script>

<style scoped>
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