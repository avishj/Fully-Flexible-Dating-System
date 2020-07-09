<template>
  <div id="app">
    <ProgressBar size="medium" val="60" color="#ED3B9D" />
    <NavBar v-bind:auth_status="auth_status" />
    <router-view />
    <FAQ />
    <Footer />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FAQ from "./components/FAQ.vue";
import Footer from "./components/Footer.vue";
import ProgressBar from "vue-simple-progress";

export default {
  name: "app",
  components: {
    NavBar,
    FAQ,
    Footer
    // ProgressBar
  },
  data() {
    return {
      auth_status: false
    };
  }
};
</script>

<style>
@import "./assets/css/mybulma.css";
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import "./assets/css/bulma-collapsible.min.css";
@import "./assets/css/bulma-divider.min.css";
@import "./assets/css/style.css";
</style>
