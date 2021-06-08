<template>
    <div>
    <form @submit="register" align="center" autocomplete="off" class="add-form">
        <div class="form_container">
            <br><br>
            <label> NAME </label>
            <input class="input" v-model="name" type="text" id="name" name="name" placeholder="name" required>

            <label> SURNAME </label>
            <input class="input" v-model="surname" type="text" id="surname" name="surname" placeholder="surname" required>

            <label> ADDRESS </label>
            <input class="input" v-model="address" type="text" id="address" name="address" placeholder="address" required>

            <label> e-mail </label>
            <input class="input" v-model="mail" type="email" id="email" name="email" placeholder="e-mail" required>

            <label for="phone">TEL</label>
            <input class="input" v-model="phone" type="tel" id="phone" name="phone" placeholder="tel"  required>

            <label> USERNAME </label>
            <input class="input" v-model="userName" type="text" id="username" name="username" placeholder="username" required>

            <label> PASSWORD </label>
            <input class="input" v-model="password" type="password" id="password" name="password" placeholder="password" required>
            <button type="submit">REGISTRATION</button> <!-- @click="register()" -->
        </div>
    </form>
    </div>
</template>

<script>
    export default {
        name: "RegistrationForm",
        data() {
            return {
                name: '',
                surname: '',
                address: '',
                mail: '',
                phone: '',
                userName: '',
                password: '',
            }
        },
        methods: {
            register(e) {
                e.preventDefault();
                // vsi vnosi - pogleda, če so polja prazna
                let inputs = document.getElementsByClassName('input');
                for (let item of inputs) {
                    if (item.value === '') {
                        alert('fill all the inputs');
                        return; // za vsako polje pogleda, ce je polno, in ce ni, prekine celotno funkcijo
                    }
                }
                const newUser = {
                    firstName: this.name,
                    lastName: this.surname,
                    address: this.address,
                    email: this.mail,
                    tel: this.phone,
                    username: this.userName,
                    password: this.password,
                    history: [],
                    wishList: []    // array of OBJECTS
                }
                // clear the form
                for (let item of inputs) {
                    item.value = '';
                }
                this.$emit('add-user', newUser);   // emit to Registration 
            }
        },
    }
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
input, button, label {
    /* display: table; */
    display: block;
    margin-left: auto;
    margin-right: auto;
}
input {
    margin-bottom: 1vh;
    margin-top: 0.5vh;
    border-radius: 1vw;
    min-height: 2vh;
    text-align: center;
    font-size: 2vh;
}
button {
    min-height: 1.5vw;
    color: black;
    font-size: 1em;
    font-weight: bold;
    border-radius: 10px;
    margin-top: 2vh;
    padding: 9px 25px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    background-color: rgb(132, 184, 30);
}

</style>