<template>
  <nav v-show="Show" id="nav">
    <!-- router-link doesn't send a new request to the server like an 'a' tag do -->
    <router-link :to="{ name: 'Home'} ">Home</router-link> |
    <router-link :to="{ name: 'About', params: { msg: 'About Page', img: image } }">About</router-link> |
    <router-link :to="{ name: 'Profile', params: { img: image } }">Profile</router-link> |  <!-- img: bild[72].thumbnail -->
    <router-link :to="{ name: 'Contact' }">Contact Us</router-link> |
    <router-link :to="{ name: 'Game' }">Game</router-link> |
    <!-- <router-link :to="{ name: 'AdminHome', params: { userName: 'George', passWord: 'Murphy' } }">Admin</router-link> -->
  </nav>
  <RegistrationButton />
</template>

<script>
import RegistrationButton from './RegistrationButton.vue'
export default {
  name: "Navigation",
  components: {
    RegistrationButton,
  },
  props: {
    msg: String,
    userName: String,
    passWord: String,
    image: String,  // image: Image ??,
    // bild: String
  },
  computed: {
    Show() {
      if (this.$route.path === `/admin/`) {
        return false;
      } else if (this.$route.name === "UserHome") {
        return false;
      } else if (this.$route.name === 'privateGameDetails') {
        return false;
      } else if (this.$route.name === 'ManageGames') {
        return false;
      } else if (this.$route.name === 'ManageUsers') {
        return false;
      } else if (this.$route.name === 'ShoppingBasket') {
        return false;
      } else if (this.$route.name === 'UserDetails') {
        return false;
      } else if (this.$route.name === 'OrderDetails') {
          return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped>

</style>
