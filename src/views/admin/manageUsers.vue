<template>
    <div style="margin-top: 5vh">
        <span class="tooltip">
            <button @click="back" class="dir"><i style="color: Mediumslateblue" class="fas fa-arrow-left fa-2x"></i></button>
            <span class="tooltiptext">Go Back</span>
        </span>
        <span class="tooltip">
            <button @click="redirect" class="dir"><i style="color: Mediumslateblue" class="fas fa-home fa-2x"></i></button>
            <span class="tooltiptext">Log Out</span>
        </span>
    </div>
    <div v-for="user in users" :key="user.id">
        <h2 id="user">
            <span id="leftSpan">
                <button @click="seeUsersDetails(user.id)" class="userInfo">
                    <span class="tooltip">
                        <i style="color: Mediumslateblue" class="fas fa-user-friends fa-1x"></i>
                        <span class="tooltiptext">User Info</span>
                    </span>
                </button>
                id: {{ user.id }}
            </span> <span id="rightSpan">{{ user.firstName }} {{ user.lastName }} </span>
        </h2>
    </div>
</template>

<script>
    export default {
        name: 'ManageUsers',
        data() {
            return {
                users: this.$store.state.users,
            }
        },
        methods: {
            redirect() {
                this.$router.push( { name: 'Home' });
            },
            back() {
                this.$router.go(-1);
            },
            async seeUsersDetails(id) {
                this.$store.state.currentUser = await this.getUser(id);
                // console.log(this.$store.state.currentUser.firstName);
                this.$router.push({ name: 'UserDetails', params: { name: this.$store.state.currentUser.firstName, id: this.$store.state.currentUser.id } })
            },
            async getUser(id) {
                const data = await (await fetch(`http://localhost:5000/users/${id}`)).json();
                return data;
            },
            async getUsers() {
                const res = await fetch('/api/users');
                const data = res.json();
                return data;
            },
        },
        async mounted() {
            this.$store.state.users = await this.getUsers();
            console.log(this.users);
        }
    }
</script>

<style scoped>
#user {
    position: relative;
    height: 5vh;
    /* border: 2px solid green; */
}
#user #leftSpan {
    position: absolute;
    left: 30vw;
    top: 1vh;
}
#user #rightSpan {
    position: absolute;
    left: 40vw;
    top: 1vh;
}
.userInfo {
  margin: 0 10px;
  /* margin-top: 30px; */
  padding: 10px;
  border: 4px solid gray;
  border-radius: 7vh;
  background-color: rgb(165, 163, 163);
  cursor: pointer;
}
#manageUsers {
  color:yellow;
  font-weight: bold;
  font-size: 1em;
  margin-top: 5vh;
  margin-left: 20px;
  padding: 9px 25px;
  border: 3px solid green;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.7s ease 0s;
  background-color: rgb(10, 74, 128);
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>