<template>
  <div class="about">
    <!-- <section class="navigation">
      <Navigation />
    </section> -->
    <section class="underNavigation">
      <h2>{{ message }}</h2>
      <br>
      <img :src="image" alt="no pic">
      <h2>LOREM IPSUM</h2>
    </section>
    <p>
      Lorem Ipsum
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
      "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
      What is Lorem Ipsum?
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

      Why do we use it?
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).      
</p>
  </div>
  <div>
    <Redirect id="redir" />
  </div>
</template>

<script>
// import Navigation from '../../components/Public/Navigation'
import Redirect from '@/components/Public/Redirect'

export default {
  name: "Registration",
  components: {
    // Navigation,
    Redirect,
  },
  data() {
    return {
      message: this.$route.params.msg,
      image: this.$route.params.img,
    }
},
}
</script>

<style scoped>
#redir {
  margin-top: 7vh;
}
p {
  text-align: center;
  margin-left: 10vw;
  margin-right: 10vw;
}

.navigation {
    position: fixed;
    top: 0;
    width: 100%;
    overflow: hidden;
    background-color: #040413;
}

.underNavigation {
    margin-top: 18vh;
}
</style>