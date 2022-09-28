<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="f in floorList" :key="f.id" :floor="f"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
import { mapActions, mapState } from "vuex";
export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  computed: {
    ...mapState("home", ["floorList"]),
  },
  methods: {
    ...mapActions("home", ["reqfloor"]),
  },
  mounted() {
    this.reqfloor(), 
    this.$store.dispatch("user/getUserInfo");
  },
};
</script>

<style>
</style>