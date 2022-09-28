<template>
  <div>
    <Header></Header>
    <router-link to="/home"></router-link>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import { mapActions } from 'vuex';
export default {
  name: "App",
  components: { Header, Footer },
  methods:{
    ...mapActions('home',['category'])
  },
  mounted() {
    this.category()
  },
};
</script>

<style>
</style>