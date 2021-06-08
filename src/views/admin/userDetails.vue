<template>
    <div>
        <button @click="goBack" id="back">BACK</button>
        <span class="tooltip">
            <button @click="updateUser(userid)" id="remove"><i style="color: Mediumslateblue" class="fas fa-pen-nib"></i></button>
            <span class="tooltiptext">update user data</span>
        </span>
        <span class="tooltip">
            <button @click="removeUser(userid)" id="remove"><i style="color: Mediumslateblue" class="fas fa-times fa-1x"></i></button>
            <!-- <button @click="removeUser(userid)" id="remove"><i style="color: Mediumslateblue" class="fas fa-history"></i></button> -->
            <span class="tooltiptext">remove/delete user</span>
        </span>
    </div>
    <div id="data">
        <h2>id: <span class="data">{{ userid }}</span></h2>
        <h2>firstName: <span class="data">{{ firstName }}</span></h2>
        <h2>lastName: <span class="data">{{ lastName }}</span></h2>
        <h2>address: <span class="data">{{ address }}</span></h2>
        <h2>email: <span class="data">{{ email }}</span></h2>
        <h2> phone: <span class="data">{{ phone }}</span></h2>
        <h2>username: <span class="data">{{ computeUsername }}</span></h2>
        <h2>password: <span class="data">{{ computePassword }}</span></h2>
    </div>
    <div v-if="notEmpty" class="history">
        <div class="order" v-for="item in history" :key="item.totalPrice">
            <h3>ORDER #{{ item.orderId }}</h3>
            <div class="game" v-for="item in item.order" :key="item.id">
                <h4>ID: {{ item.id }}</h4>
                <h4>{{ item.name }}</h4>
                <h4>{{ item.price }}€</h4>
            </div>
        </div>
    </div>

    <!-- pop-up form -->
    <div v-show="update" class="form-popup" id="myForm">
        <form action="/action_page.php" class="form-container">
            <h3>{{ firstName }} {{ lastName }}</h3>
            <section class="inputs">
                <label for="username">Username</label>
                <input type="text" id="username" class="input" name="username" placeholder="username" autocomplete="off">
                <br>
                <label for="password">Password</label>
                <input type="text" id="password" class="input" name="password" placeholder="password" autocomplete="off">
            </section>
            <button @click="changeData" class="btn">Change</button>
            <button @click="closeForm" type="submit" class="btn cancel">Close</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'UserDetails',
        props: {
            name: String,
            id: String
        },
        data() {
            return {
                currentUser: this.$store.state.currentUser,
                userid: this.$store.state.currentUser.id,
                firstName: this.$store.state.currentUser.firstName,
                lastName: this.$store.state.currentUser.lastName,
                address: this.$store.state.currentUser.address,
                email: this.$store.state.currentUser.email,
                phone: this.$store.state.currentUser.tel,
                username: this.$store.state.currentUser.username,
                password: this.$store.state.currentUser.password,
                history: this.$store.state.currentUser.history,
                // order: this.$store.state.currentUser.history.order,
                notEmpty: false,
                update: false
            }
        },
        methods: {
            goBack() {
                this.$store.state.currentUser = {};
                this.$router.go(-1);
            },
            updateUser() {
                this.update = !this.update;
            },
            closeForm(e) {
                e.preventDefault();
                this.update = false;
            },
            async changeData(e) {
                e.preventDefault();
                let username = document.getElementById('username').value;
                let password = document.getElementById('password').value;
                this.currentUser = { ...this.currentUser, username: username, password: password };
                this.username = username;
                this.password = password;
                document.getElementById('username').value = "";
                document.getElementById('password').value = "";
                this.update = false;

                const res = await fetch(`http://localhost:5000/users/${this.userid}`, {
                    method: 'PUT',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify(this.currentUser)
                });
                console.log(res);
                console.log(await res.json());
            },

            async removeUser(id) {
                // console.log("id: ", id);
                if (confirm('Delete User?')) {
                    await fetch(`http://localhost:5000/users/${id}`, {
                    method: 'DELETE'
                    });
                    this.$store.state.users = this.$store.state.users.filter((user) => user.id !== id);
                    this.goBack();
                }
            }
        },
        computed: {
            computeUsername() {
                return this.username;
            },
            computePassword() {
                return this.password;
            }
        },
        created() {
            let orderLength = this.$store.state.currentUser.history.length;
            console.log("order length: ", orderLength);
            if (orderLength > 0) {
                this.notEmpty = true;
            }
            console.log("Current user: ", this.$store.state.currentUser)
        }
    }
</script>

<style scoped>
.history {
    /* border: 2px solid green; */
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    place-items: center;
}
.order {
    justify-content: center;
    width: 30vw;
    /* border: 2px solid blue; */
}
.game {
    margin-left: 3vw;
    margin-right: 3vw;
    border: 2px solid grey;
}
#back, #remove {
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
h2 {
    padding: 2vh;
    background-color: white;
    border-radius: 2vh;
}
#data {
    margin-top: 10vh;
    min-height: 15vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 10vh 10vh;
    place-items: center;
}
.data {
    color:grey;
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

/* FORM POPUP */
 .form-popup {
    /* display: none; */
    position: fixed;
    bottom: 0;
    right: 15px;
    border: 3px solid #f1f1f1;
    z-index: 9;
    }

    /* Add styles to the form container */
    .form-container {
    max-width: 30vw;
    min-width: 26vw;
    padding: 10px;
    background-color: white;
    }

    /* Set a style for the submit/login button */
    .form-container .btn {
    background-color: #04AA6D;
    color: white;
    padding: 16px 20px;
    border: none;
    cursor: pointer;
    width: 100%;
    margin-bottom:10px;
    opacity: 0.8;
    }

    /* Add a red background color to the cancel button */
    .form-container .cancel {
    background-color: red;
    }

    /* Add some hover effects to buttons */
    .form-container .btn:hover, .open-button:hover {
    opacity: 1;
    }

    #myForm {
        visibility: visible;
        opacity: 1;
        transition: visibility 0s linear 0ms, opacity 300ms;
    }

    .input {
        height: 4vh;
        width: 15vw;
        border: none;
        margin-top: 0.5vh;
        margin-bottom: 0.5vh;
        margin-left: 1vw;
        font-size: 2vh;
    }
</style>