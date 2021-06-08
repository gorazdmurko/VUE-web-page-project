<!-- vbase-css-->

<template>
    <div v-show="dontShow">
        <br>
        <router-link :to="{ name: 'SignIn' }"><button>Sign In</button></router-link>
        <router-link :to="{ name: 'Registration' }"><button>Registration</button></router-link>
        <br><br>
    </div>
</template>

<script>
    export default {
        name: "RegistrationButton",
        computed: {
            dontShow() {
                if (this.$route.path === "/admin/") {
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
    }
</script>

<style scoped>
button {
  color:yellow;
  font-weight: bold;
  font-size: 1em;
  margin-left: 20px;
  padding: 9px 25px;
  border: 3px solid green;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.7s ease 0s;
  background-color: rgb(10, 74, 128);
}
</style>