<template>
    <h2 id="hello">Hello {{ username }} {{ password }}</h2>
    <div class="buttons">
        <button @click="signOut()">SIGN OUT</button>
        <button @click="manageGames">GAMES</button>
        <button @click="manageUsers">USERS</button>
        <!-- <router-view /> -->
    </div>
    <div class="image">
        <img :src="picture" alt="no picture">
    </div>
    <!-- <Search /> -->
</template>

<script>
    import router from "../../router";      // if we use router.push instead of this.$router.push
    // import Search from '../../components/Admin/Search';
    export default {
        name: 'AdminHome',
        components: {
            // Search,
        },
        props: {
            userName: String,   // ker sem jih prenesel iz Navigation preko <router-link> !!
            passWord: String    //
        },
        data() {
            return {
                users: [],
                games: [],
                moreGames: [],
                username: this.$route.params.userName,
                password: this.$route.params.passWord,
                picture: Image,
            }
        },
        methods: {
            signOut() {
                router.push({ name: 'Home' });
            },
            manageUsers() {
                this.$router.push({ name: 'ManageUsers' });
            },
            manageGames() {
                this.$router.push({ name: 'ManageGames' });
            },
        },
        
        
        // async getGamesForSale() {
        //     const res = await fetch('/api/gamesForSale');
        //     const data = res.json();
        //     return data;
        // },
        // async get1GameForSale(id) {
        //     const res = await fetch(`/api/gamesForSale/${id}`);
        //     const data = res.json();
        //     return data;
        // },
        // async getMoreGames() {
        //     const res = await fetch('/api/moreGames');
        //     const data = res.json();
        //     return data;
        // },
        // async get1GameToAdd(id) {
        //     const res = await fetch(`/api/moreGames/${id}`);
        //     const data = res.json();
        //     return data;
        // },

        created() {
            let num = Math.floor(Math.random() * 50);
            this.picture = this.$store.state.hottestGames[num].thumbnail;
            setInterval(() => {
                let num = Math.floor(Math.random() * 50);
                this.picture = this.$store.state.hottestGames[num].thumbnail;
            }, 1000);
        }
    }
</script>

<style scoped>
#hello {
    margin-top: 10vh;
    margin-left: auto;
    margin-right: auto;
}
button {
  color:yellow;
  font-weight: bold;
  font-size: 1em;
  margin-left: 20px;
  padding: 9px 25px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  background-color: rgb(10, 74, 128);
}
.buttons {
    margin-top: 10vh;
}
.image {
    margin-top: 14vh;

}
</style>