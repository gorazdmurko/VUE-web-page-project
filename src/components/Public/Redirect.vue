<template>
  <div>
    <button @click="back" class="dir"><i style="color: Mediumslateblue" class="fas fa-arrow-left fa-2x"></i></button>
    <button @click="redirect" class="dir"><i style="color: Mediumslateblue" class="fas fa-home fa-2x"></i></button>
    <button @click="forward" class="dir"><i style="color: Mediumslateblue" class="fas fa-arrow-right fa-2x"></i></button>
  </div>
</template>

<script>
export default {
  components: {
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    redirect() {
      this.$router.push( { name: 'Home' });
    },
    forward() {
      this.$router.go(1);
    },
  }
}
</script>


<style>
.dir {
  margin: 0 10px;
  /* margin-top: 30px; */
  padding: 10px;
  border: none;
  border-radius: 4vh;
  background-color: rgb(165, 163, 163);
  cursor: pointer;
}
</style>