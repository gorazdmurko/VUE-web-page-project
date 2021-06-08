<template>
  <div>
    <section class="navigation">
      <Navigation :image="picture" />
    </section>
    <router-view />
  </div>
  <div class="bottom">
    <br>//
    <h2>Copyright&copy; {{ computedMethod }}</h2>
  </div>
</template>

<script>
import Navigation from './components/Public/Navigation'
export default {
  components: {
    Navigation,
  },
  data() {
    return {
      firstName: 'Gorazd',
      lastName: 'Murko',
      num: Number,
      items: [],
      picture: String,  // Image ??
    }
  },
  methods: {
    async getItem(id) {
      const res = await fetch(`/api/moreGames/${id}`);
      const data = res.json();
      return data;
    },
    async getItems() {
      const res = await fetch(`/api/moreGames/`);
      const data = res.json();
      return data;
    },
    changeString() { setInterval( () => {
      if (this.firstName == 'Gorazd' && this.lastName == 'Murko') {
        this.firstName = 'Academia';
        this.lastName = 'Higher Educational College';
      } else if (this.firstName == 'prof. Ervin' && this.lastName == 'Schaff') {
        this.firstName = 'Web Developers & ';
        this.lastName = 'Software Engineers';
      } else if (this.firstName == 'Academia' && this.lastName == 'Higher Educational College') {
        this.firstName = 'prof. Ervin';
        this.lastName = 'Schaff';
      } else {
        this.firstName = 'Gorazd';
        this.lastName = 'Murko';
      }
    }, 2500); },

    // rotatePics() {
    //   setInterval( () => {
    //     this.num = Math.floor(Math.random() * 500);
    //     this.picture = this.items[this.num].thumbnail;
    //   }, 1000)
    // },
  },
  computed: {
    computedMethod() {
      return this.firstName + ' ' + this.lastName;
    },
    changePicture() {
      return this.picture;
    }
  },
  mounted() {
    this.changeString();
    // this.rotatePics();
  },
  async created() {
    this.items = await this.getItems();
    this.picture = this.items[74].thumbnail;
  }
}
</script>


<style>
.navigation {
    position: fixed;
    top: 0;
    width: 100%;
    overflow: hidden;
    background-color: #040413;
}

.bottom {
  margin-top: 10vh;
  margin-bottom: 5vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #31978a;
}

#nav {
  padding: 30px;
  /* padding: 30em; */
}

#nav {
  font-weight: bold;
  /* color: #2c3e50; */
  color: #2774c2;
}

/* kadar je router-link aktiven */
#nav a.router-link-exact-active {
  color: rgb(10, 74, 128);
  border-radius: 10px;
  padding: 10px;
  background-color: #42b983;
  font-weight: bold;
  border: 3px solid green;
}
/* a.router-link-active {
  font-weight: bold;
  font-style: italic;
} */

</style>
