/* eslint-disable prettier/prettier */
<template>
  <div>
    <!-- <section class="navigation">
      <Navigation />
    </section> -->
    <section class="underNavigation">
      <h2>Contact View</h2>
      <br>
      <img alt="no pic" src="@/assets/pic5786795.png" />
    </section>
  </div>
  <div>
    <h2>CONTACT INFO:</h2>
    <h4>info@board-games.com</h4>
    <h4>sales.department@board-games.com</h4>
    <h4>tel. 00427 51 493 178</h4>
    <h4>fax. 00901 321 654 987</h4>
  </div>
  <div>
    <Redirect />
  </div>
</template>

<script>
// import Navigation from '../../components/Public/Navigation'
import Redirect from '@/components/Public/Redirect'

export default {
  // eslint-disable-next-line no-undef
  name: "Contact",
  components: {
    // Navigation,
    Redirect,
  }
}
</script>

<style scoped>
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