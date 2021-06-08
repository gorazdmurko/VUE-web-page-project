<template>
    <div class="navigation">
        <button @click="back">BACK</button>
    </div>
    <section class="section">
        <h4>{{ user }}</h4>
        <h1>LAST ORDER</h1>
    </section>
    <div class="currentOrder">
        <div v-for="item in currentOrder" :key="item.id">
            <div class="order">
                <h2>{{ item.name }}</h2>
                <h2>id: {{ item.id }}</h2>
                <h2>year: {{ item.yearPublished }}</h2>
                <h2>price: {{ item.price }}</h2>
                <img :src="item.thumbnail" />
            </div>
        </div>
    </div>
    <br><hr>
    <h1>HISTORY</h1>
    <div class="orders">
        <div class="order" v-for="item in history" :key="item.totalPrice">
            <h3>ORDER #{{ item.orderId }}</h3>
            <div class="game" v-for="item in item.order" :key="item.id">
                <h4>ID: {{ item.id }}</h4>
                <h4>{{ item.name }}</h4>
                <h4>{{ item.price }}€</h4>
            </div>
            <h4>total price: {{ item.totalPrice }} €</h4>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OrderDetails',
        data() {
            return {
                user: this.$store.state.currentUser.firstName,
                history: this.$store.state.currentUser.history,
                currentOrder: this.$store.state.currentBasket,
            }
        },
        methods: {
          back() {
              this.$store.state.currentBasket = []
              this.$router.go(-2);
          },

        },
        created() {
            console.log("User: ", this.$store.state.currentUser);
            console.log("Basket: ", this.$store.state.currentBasket);
        }
    }
</script>

<style scoped>
.navigation {
    position: fixed;
    top: 0;
    width: 100%;
    overflow: hidden;
    background-color: #040413;
    z-index: 1;
}
.section {
    margin-top: 13vh;
}
.orders {
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
.currentOrder {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    place-items: center;
}
button {
  color:yellow;
  font-weight: bold;
  font-size: 1em;
  margin-top: 5vh;
  margin-bottom:2vh;
  margin-left: 20px;
  padding: 9px 25px;
  border: 3px solid green;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.7s ease 0s;
  background-color: rgb(10, 74, 128);
}
</style>