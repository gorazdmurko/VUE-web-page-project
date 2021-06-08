<template>
  <div class="registration">
    <!-- <section class="navigation">
      <Navigation />
    </section> -->
    <section class="underNavigation">
      <h2>Welcome to Registration Form</h2>
    </section>
  </div>
  <RegistrationForm @add-user="addUser" />
  <Redirect id="redir" />
</template>

<script>
import RegistrationForm from '../../components/Public/RegistrationForm'
// import Navigation from '../../components/Public/Navigation'
import Redirect from '@/components/Public/Redirect'

export default {
  name: "Registration",
  components: {
    RegistrationForm,
    // Navigation,
    Redirect,
  },
  data() {
    return {
      allUsers: []
    }
  },
  methods: {
    addUserToStorage(user) {
      if (!localStorage.users) {
        localStorage.users = JSON.stringify(this.allUsers);
      } else {
        this.allUsers = JSON.parse(localStorage.users);
      }
      // allUsers.push(user); same
      this.allUsers = [ ...this.allUsers, user ];
      console.table(this.allUsers);

      localStorage.users = JSON.stringify(this.allUsers);  // dodaj v storage
      alert('ERROR -> status: 500, ok: false\n\nAdded to STORAGE');
      this.$router.push({ name: 'SignIn' });
    },
    async addUser(user) {
      try {
        const res = await fetch(`api/users`, {
          method: 'POST',
          // mode: 'cors',
          // cache: 'no-cache',
          // credentials: 'same-origin', // 'include', 'omit'
          headers: { 'Content-Type': 'application/json' },  // 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json',
          // redirect: 'follow',
          // referrerPolicy: 'no-referrer',
          body: JSON.stringify(user)
        })
        console.log("response:", res);
        const data = await res.json();  // samo na zadnje dodan objekt
        console.log("data:", data);
        this.allUsers = [ ...this.allUsers, data ];
        console.log("this.allUsers:", this.allUsers);
        alert('Registration succeeded');
        this.$router.push( { name: 'SignIn' } );
      } catch(e) {
        console.log(e);
        this.addUserToStorage(user);
      }
    },
    async fetchAllUsers() {
      const res = await fetch('api/users');
      const data = await res.json();
      console.log("From server: ", data); // kontrola
      return data;
    },
    async fetchUser(name) {
      const res = await fetch(`api/${name}`);
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.allUsers = await this.fetchAllUsers();
    console.log("From Proxy: ", this.allUsers); // kontrola
  }
}
</script>

<style scoped>
#redir {
  margin-top: 5vh;
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
/* button {
    color: black;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    background-color: rgb(103, 134, 41);
} */
</style>