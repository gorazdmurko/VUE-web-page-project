<template>
    <div style="margin-top: 5vh">
        <button @click="back" class="dir"><i style="color: Mediumslateblue" class="fas fa-arrow-left fa-2x"></i></button>
        <button @click="redirect" class="dir"><i style="color: Mediumslateblue" class="fas fa-home fa-2x"></i></button>
    </div>
    <div>
        <button id="manageGames" @click="showAddGame">Add Game</button>
        <button id="manageGames" @click="showRemoveGame">Remove Game</button>
    </div>

    <div v-show="showRemove" id="games2Remove">
        <Games2Remove @remove-Game="removeThisGame" :games="gamesToRemove" />
    </div>
    <div v-show="showAdd" id="games2Add">
        <Games2Add @add-Game="addThisGame" :games="gamesToAdd" />
    </div>
</template>

<script>
    import Games2Remove from '@/components/Admin/Games2Remove'
    import Games2Add from '@/components/Admin/Games2Add'
    export default {
        name: 'ManageGames',
        components: {
            Games2Remove, Games2Add
        },
        data() {
            return {
                gamesToRemove: this.$store.state.gamesForSale,
                gamesToAdd: this.$store.state.moreGames,
                remove: false,
                add: false
            }
        },
        computed: {
            showAdd() {
                return this.add;
            },
            showRemove() {
                return this.remove;
            }
        },
        methods: {
            redirect() {
                this.$router.push( { name: 'Home' });
            },
            back() {
                this.$router.go(-1);
            },
            showAddGame() {
                this.add = true;
                this.remove = false;
                // console.log(this.gamesToAdd);
            },
            showRemoveGame() {
                this.add = false;
                this.remove = true;
                // console.log(this.gamesToRemove);
            },
            addThisGame(id) {
                try {
                    this.get1GameToAdd(id).then(this.addGame);
                } catch (e) {
                    console.log(e);
                }
            },
            async removeThisGame(id) {
                try {
                    const res = await fetch(`http://localhost:5000/gamesForSale/${id}`, {
                    method: 'DELETE',
                    })
                    res.status === 200 ? (this.gamesToRemove = this.gamesToRemove.filter(game => game.id != id)) : alert('Error deleting game');
                } catch (e) {
                    console.log(e);
                }
            },

            async get1GameToAdd(id) {
                const res = await fetch(`/api/moreGames/${id}`);
                const data = res.json();
                return data;
            },

            async addGame(game) {
                try {
                    const res = await fetch('/api/gamesForSale', {
                    method: 'POST',
                    headers: {'Content-type' : 'application/json'},
                    body: JSON.stringify(game)
                }) 
                    const data = await res.json();
                    this.gamesToRemove = [ ...this.gamesToRemove, data ];
                } catch (err) {
                    console.log(err);
                }
            },
        },
        mounted() {
            this.gamesForSale = this.$store.state.gamesForSale;
            this.gamesToAdd = this.$store.state.moreGames;
            console.log(this.gamesForSale);
        }
    }
</script>

<style scoped>
#manageGames {
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
#games2Remove {
    margin-top: 10vh;
    display: grid;
    grid-template-columns: 1fr 5px 1fr 5px 1fr;
    grid-template-rows: 100px 200px;
    place-items: center;
}
#games2Add {
    margin-top: 10vh;
    display: grid;
    grid-template-columns: 1fr 5px 1fr 5px 1fr;
    grid-template-rows: 100px 200px;
    place-items: center;
}
</style>