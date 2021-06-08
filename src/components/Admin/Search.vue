<template>
    <div>
        <form @submit="searchById" autocomplete="off">
            <label for="gameID">Game id: </label>
            <input id="gameID" v-model="input_id" type="text" placeholder="game id">
            <!-- <label for="submitBtn">SEARCH</label> -->
            <input class="submitBtn" type="submit" value="SEARCH">
        </form>

        <form @submit="searchByName" autocomplete="off">
            <label for="game">Game: </label>
            <input id="game" v-model="input_name" type="text" placeholder="game name">
            <!-- <label for="submitBtn">SEARCH</label> -->
            <input class="submitBtn" type="submit" value="SEARCH">
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Search',
        data() {
            return {
                input_id: '',
                input_name: '',
            }
        },
        methods: {
            searchById(event) {
                event.preventDefault();
                let ID = parseInt(this.input_id);
                if (isNaN(ID)) {
                    alert('ERROR: input not INTEGER');
                } else {
                    console.log(ID);
                }
                this.input_id = '';
            },
            searchByName(event) {
                event.preventDefault();
            }
        },
    }
</script>

<style scoped>
form {
    margin-top: 5vw;
    margin-left: auto;
    margin-right: auto;
}
label, input {
    min-height: 2.5vh;
}
#gameID, #game {
    margin-left: 2vw;
    margin-right: 2vw;
    border-radius: 10px;
    text-align: center;
}
.submitBtn {
    color: orange;
    font-weight: bold;
    font-size: 2vh;
    background-color: rgb(41, 69, 148);
    border-radius: 10px;
}
</style>