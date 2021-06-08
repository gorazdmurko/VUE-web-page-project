<template>
    <div>
        <h1>HELLO {{ name }} {{ surname }}</h1>
        <button @click="goBack" id="confirm">BACK</button>
    </div>
    <div class="form-popup" id="myForm">
        <form action="/action_page.php" class="form-container">
            <h1>Basket</h1>
            <div id="basket" v-for="item in basket" :key="item.id">
                <h4><span>Price {{ item.price }}€ - {{ item.name }}</span>  <i @click="removeItemFromBasket(item.id)" class="fas fa-times fa-2x"></i></h4>
            </div>
            <div>total price: {{ computeTotalPrice }} €</div>
            <button type="submit" class="btn" @click="emptyTheBasket">Empty</button>
            <button type="submit" class="btn confirm" @click="confirmBuy">Confirm</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'ShoppingBasket',
        params: {
            name: String,
            surname: String,
            id: String
        },
        data() {
            return {
                basket: this.$store.state.currentBasket,
                totalPrice: null,
                name: this.$route.params.name,
                surname: this.$route.params.surname,
                id: this.$store.state.currentUserId,
                currentUser: {},
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            emptyTheBasket(e) {
                e.preventDefault();
                this.basket = [];
                this.$store.state.currentBasket = [];
                this.totalPrice = 0;
                this.empty = true;
                this.opened = false;
                this.$router.go(-1);
            },
            removeItemFromBasket(id) {
                const index = this.basket.findIndex((item) => item.id === id);
                this.basket.splice(index, 1);
                this.totalPrice = this.price();
                console.log('Basket: ', this.basket);
                console.log('Store Basket: ', this.$store.state.currentBasket);
            },
            price() {
                let totalPrice = 0;
                for (let item of this.basket) {
                    totalPrice += item.price;
                }
                return totalPrice;
            },
            basketTitles() {
                let basketTitles = [];
                for (let item of this.basket) {
                    let title = { id: item.id, name: item.name, price: item.price };
                    basketTitles.push(title);
                }
                return basketTitles;
            },
            randomId() {
                let num = Math.floor(Math.random()*10000);
                return num;
            },

            async confirmBuy(e) {
                e.preventDefault();
                let updatedHistory = {
                    order: this.basketTitles(),
                    totalPrice: this.price(),
                    orderId: this.randomId()
                }
                this.currentUser.history.push(updatedHistory);
                // console.log(this.currentUser);
                await fetch(`http://localhost:5000/users/${this.id}`, {
                    method: 'PUT',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify(this.currentUser)
                })
                // this.basket = [];
                this.$router.push({ name: 'OrderDetails' })
            },

            async getUser(id) {
                const res = await fetch(`/api/users/${id}`);
                const data = res.json();
                return data;
            },
        },
        computed: {
            computeTotalPrice() {
                return this.totalPrice;
            }
        },
        async mounted() {
            this.$store.state.currentUser = await this.getUser(this.id);
            this.currentUser = this.$store.state.currentUser;
            this.totalPrice = this.price();
            // console.log(this.currentUser);
        }
    }
</script>

<style scoped>

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


.form-popup {
    /* display: none; */
    position: fixed;
    /* bottom: 20vw; */
    top: 20vh;
    right: 24vw;
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
    max-width: 60vw;
    min-width: 50vw;
    padding: 10px;
    background-color: white;
    }

    /* Set a style for the submit/login button */
    .form-container .btn {
    background-color: orange;
    color: white;
    padding: 16px 20px;
    border: none;
    cursor: pointer;
    width: 100%;
    margin-bottom:10px;
    opacity: 0.8;
    }

    /* Add a red background color to the confirm button */
    .form-container .confirm {
    background-color: #04AA6D;
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
</style>