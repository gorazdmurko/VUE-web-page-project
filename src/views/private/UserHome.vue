<template>
    <div v-if="update" class="update">
        <div class="updateForm">
            <h3>Change data</h3>
            <h2>{{ userFirst }} {{ userLast }}</h2>
            <label for="username">username</label>
            <input id="username" class="input" type="text" name="username" placeholder="password" autocomplete="false">
            <br>
            <label for="password">password</label>
            <input id="password" class="input" type="text" name="password" placeholder="password" autocomplete="false">
            <br>
            <button @click="updateUser" class="submit" type="submit">OK</button>
        </div>
    </div>
    <div>
        <section class="navigation">
        <h3><sup class="sup">{{ msgRotation }}</sup></h3>
        <h3><sup class="sup">Hello {{ userFirst }} {{ userLast }}</sup></h3>
        <div id="buttons">
            <span class="tooltip">
                <button @click="redirect" class="dir"><i style="color: Mediumslateblue" class="fas fa-home fa-2x"></i></button>
                <span class="tooltiptext">Home</span>
            </span>
            <span class="tooltip">
                <button @click="playGame" class="dir"><i class="fas fa-gamepad fa-2x" style="color: Mediumslateblue"></i></button>
                <span class="tooltiptext">Game</span>
            </span>
            <span class="tooltip">
                <button @click="updateForm" class="dir"><i style="color: Mediumslateblue" class="fas fa-pen-nib fa-2x"></i></button>
                <span class="tooltiptext">update data</span>
            </span>
            <button v-if="!emptyBasket" @click="openForm" class="dir"><i class="fas fa-shopping-cart fa-2x" style="color: Mediumslateblue"></i></button>
            <button v-show="!emptyBasket" @click="goToBasket" id="confirm">Confirm</button>
        </div>
        </section>
        
        <section class="games">
        <div v-show="openedForm" class="form-popup" id="myForm">
            <form action="/action_page.php" class="form-container">
                <h1>Basket</h1>
                <div id="basket" v-for="item in basket" :key="item.id">
                    <h4><span>Price {{ item.price }}€ - {{ item.name }}</span><i @click="removeItemFromBasket(item.id)" class="fas fa-times fa-2x"></i></h4>
                </div>
                <div>total price: {{ computeTotalPrice }} €</div>
                <button type="submit" class="btn" @click="emptyTheBasket">Empty</button>
                <button type="submit" class="btn cancel" @click="closeForm">Close</button>
            </form>
        </div>

        <h3>Select from bellow {{ userFirst }}</h3>
        <Games @info="info" @addToBasket="addToBasket" :games="gamesForSale" />
        </section>
    </div>
</template>

<script>
import Games from '@/components/Private/Games'
export default {
    name: "UserHome",
    components: {
        Games,
    },
    props: {
        name: String,
        surname: String,
        id: String
    },
    data() {
        return {
            currentUser: this.$store.state.currentUser,
            gamesForSale: this.$store.state.gamesForSale,
            userFirst: this.$store.state.currentUserFirstName,
            userLast: this.$store.state.currentUserLastName,
            userId: this.$store.state.currentUserId,
            basket: this.$store.state.currentBasket,
            totalPrice: null,
            empty: true,
            opened: false,
            msg: 'We\'re Board Games Galaxy',
            update: false
        }
    },
    emits: ['addToBasket'],
    methods: {
        updateForm() {
            this.update = !this.update;
            console.log(this.currentUser);
        },

        async updateUser(e) {
            e.preventDefault();
            let password = document.getElementById('password').value;
            let username = document.getElementById('username').value;
            this.currentUser = { ...this.currentUser, password: password, username: username };
            this.$store.state.currentUser = this.currentUser;
            // console.log(this.currentUser);
            const res = await fetch(`http://localhost:5000/users/${this.userId}`, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(this.currentUser)
            });
            this.update = false;
            console.log(await res.json());
        },

        findIndexOf(gameId) {
            const index = this.gamesForSale.findIndex( item => item.id == gameId);
            return index;
        },
        addToBasket(id) {
            const index = this.findIndexOf(id);
            const game = this.gamesForSale[index];
            this.basket.push(game);
            this.$store.state.currentBasket = this.basket;
            this.totalPrice = this.price();
            if (this.basket.length > 0) {
                this.empty = false;
            } else { this.empty = true }
            // console.log('Basket: ', this.basket);
            // console.log('Store Basket: ', this.$store.state.currentBasket);
        },
        price() {
            let totalPrice = 0;
            for (let item of this.basket) {
                totalPrice += item.price;
            }
            return totalPrice;
        },
        openForm() {
            this.opened = true;
        },
        closeForm(e) {
            e.preventDefault();
            this.opened = false;
        },
        emptyTheBasket(e) {
            e.preventDefault();
            this.basket = [];
            this.$store.state.currentBasket = [];
            this.totalPrice = this.price();
            this.empty = true;
            this.opened = false;
            // console.log('Basket: ', this.basket);
            // console.log('Store Basket: ', this.$store.state.currentBasket);
        },
        goToBasket(e) {
            e.preventDefault();
            this.$router.push({ name: 'ShoppingBasket', params: {
                name: this.$store.state.currentUserFirstName, surname: this.$store.state.currentUserLastName, id: this.userId }
            });
        },
        removeItemFromBasket(id) {
            const index = this.basket.findIndex((item) => item.id === id);
            this.basket.splice(index, 1);
            this.totalPrice = this.price();
            if (this.basket.length == 0) {
                this.empty = true;
                this.opened = false;
            }
            // console.log('Basket: ', this.basket);
            // console.log('Store Basket: ', this.$store.state.currentBasket);
        },
        playGame() {
            alert('ERROR: GAME NOT AVAILABLE!');
            this.$router.push({path: './NotFound'});
        },

        redirect() {
            this.$store.state.currentBasket = [];
            this.$router.push({ name: "Home" });
        },
        info(id) {
            open(`https://boardgamegeek.com/boardgame/${id}`, '_blank')
        },
        rotateMsg() {
            setInterval(() => {
                if (this.msg === 'We\'re Board Games Galaxy' ) {
                    this.msg = 'Pleased to see you again'
                } else if (this.msg === 'Pleased to see you again') {
                    this.msg = 'Hope you enjoy our page'
                } else if (this.msg === 'Hope you enjoy our page') {
                    this.msg = 'Let us take you to the board games galaxy'
                } else if (this.msg === 'Let us take you to the board games galaxy') {
                    this.msg = 'So let the journey begin'
                } else {
                    this.msg = 'We\'re Board Games Galaxy';
                }
            }, 2500)
        },
    },
    computed: {
        emptyBasket() {
            return this.empty;
        },
        openedForm() {
            return this.opened;
        },
        msgRotation() {
            return this.msg;
        },
        computeTotalPrice() {
            return this.totalPrice;
        }
    },
    mounted() {
        this.rotateMsg();
        if (this.basket.length > 0) {
            this.empty = false;
            this.totalPrice = this.price();
        }
        // console.log('Basket: ', this.basket);
        // console.log('Store Basket: ', this.$store.state.currentBasket);
        // console.log(this.$store.state.currentUser)
    }
}
</script>

<style scoped>

.updateForm {
    background-color: black;
    position: fixed;
    border: 4px solid white;
    padding-bottom: 2vh;
    width: 30vw;
    left: 35vw;
    z-index: 1;
}
.submit {
    color:yellow;
    font-weight: bold;
    font-size: 1em;
    margin-top: 1vh;
    margin-left: 20px;
    padding: 9px 25px;
    border: 3px solid green;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.7s ease 0s;
    background-color: rgb(10, 74, 128);
}
.update {
    margin-top: 25vh;
}
.input {
    border: none;
    width: 15vw;
    height:3vh;
    font-size: 2vh;
    border-radius: 1vw;
    margin-top: 0.5vh;
    margin-bottom: 0.5vh;
    margin-left: 1vw;
    padding-left: 2vw;
}
.navigation {
    position: fixed;
    top: 0;
    width: 100%;
    overflow: hidden;
    background-color: #040413;
    z-index: 1;
}
.games {
    margin-top: 21vh;
}
#buttons {
    margin-bottom: 1vh;
    margin-top: 2vh
}
#confirm {
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

    /* form */
    /* The popup form - hidden by default */
    .form-popup {
    /* display: none; */
    position: fixed;
    bottom: 0;
    right: 15px;
    border: 3px solid #f1f1f1;
    z-index: 9;
    }

    #basket {
        position: relative;
    }

    #basket span {
        position: relative;
        right: 1vw;
    }

    .fa-times {
        position: absolute;
        right: 0vw;
    }

    #basket i:hover {
        background-color: #04AA6D;
        border-radius: 1vh;
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

    .tooltip .tooltiptext {
        visibility: hidden;
        width: 120px;
        background-color: white;
        background-color: none;
        color: black;
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