<template>
  <div class="sign_in">
    <!-- <section class="navigation">
      <Navigation />
    </section> -->
    <section class="underNavigation">
      <h2>Sign In: enter username & password</h2>
      <br>
      <img alt="no pic" src="@/assets/pic5786795.png" />
    </section>
  </div>
  <form align="center">
    <div>
        <form @submit="authenticate" autocomplete="off">
            <label> USERNAME </label>
            <input type="text" id="username" name="username" placeholder="username" required/>
            <label> PASSWORD </label>
            <input type="password" id="password" name="password" placeholder="password" required>
            <button type="submit" id="signIn">SIGN IN</button>
        </form>
    </div>
  </form>
  <div>
    <Redirect id="redir" />
  </div>
</template>

<script>
// @ is an alias to /src
// import Navigation from '../../components/Public/Navigation'
import Redirect from '@/components/Public/Redirect'
// import router from "../../router/";    ne rabim importat, ce uporabim this.$router

export default {
  name: "SignIn",
  components: {
    // Navigation,
    Redirect,
  },
  data() {
    return {
      allUsers: [],
    }
  },
  props: {
    userName: String,
    passWord: String,
    userId: Number
  },
  methods: {
    async authenticate(e) {
      e.preventDefault();
      let user = document.getElementById('username');
      let pass = document.getElementById('password');
      if (user.value === 'admin' && pass.value === 'admin') {
        this.pushRoute();
      } else {
        try {
          for (let item of this.allUsers) {
            if(item.password === pass.value && item.username === user.value) {
              this.$store.state.currentUserFirstName = item.firstName;
              this.$store.state.currentUserLastName = item.lastName;
              this.$store.state.currentUserId = item.id;
              this.$store.state.currentUser = await this.fetchUser(item.id);
              alert('Access approved!');
              this.$router.push({ name: 'UserHome', params: { userName: item.firstName, userId: item.id } }); // userName in userId rabim za URL !!
              return; // important !!
            }
          }
        } catch(err) {
          console.log("\n", err);
        }
        let c = confirm("Wrong password or username!");
        if (c !== true) {
          this.$router.push({ name: 'Registration' });
        }
        user.value = "";
        pass.value = "";
      }
    },
    showAlert() {
      alert('username does not exist');
      this.$router.push({ name: 'Registration'});
    },
    pushRoute() {
      alert('welcome ADMIN');
      this.$router.push({ name: 'AdminHome', params: { userName: 'Gorazd', passWord: 'Murko' } });
    },
    // control sentences
    log(promise, response, data) {
      try { console.log("\n", promise) } catch(e) { console.log(e) }
      try { console.log(response) } catch(e) { console.log(e) }
      try { console.log("DATA: ", data) } catch(e) { console.log(e) }
    },
    async fetchUsers() {
      const prom = fetch('api/users');
      const res = await prom;
      const data = await res.json();
      // this.log(prom, res, data);
      return data;
    },
     async fetchUser(id) {
       const res = await fetch(`http://localhost:5000/users/${id}`);
       const data = await res.json();
       return data;
     }
  },
  async mounted() {
    this.allUsers = await this.fetchUsers();
  }
};
</script>

<style scoped>
#redir {
  margin-top: 5vh;
}
button {
    min-height: 1.5vw;
    color: black;
    font-size: 1em;
    font-weight: bold;
    background-color: olivedrab;
    border-radius: 10px;
    margin-top: 1.5vw;
    padding: 9px 25px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
}
input, button, label {
    /* display: table; */
    display: block;
    margin-left: auto;
    margin-right: auto;
}
input {
    margin-bottom: 1vw;
    margin-top: 0.5vw;
    border-radius: 1vw;
    min-height: 1.2vw;
    text-align: center;
    font-size: 2vh;
}
label, input {
  min-height: 2.5vh;
}
form {
  margin-top: 3vw;
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