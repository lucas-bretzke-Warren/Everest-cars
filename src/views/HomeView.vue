<template>
  <main>
    <ListingOnCars />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ListingOnCars from "@/components/ListingOnCars.vue"; // @ is an alias to /src

@Component({
  components: {
    ListingOnCars,
  },
})
export default class HomeView extends Vue {}
</script>

<style lang="less" scoped>
main {
  height: 100vh;
  background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
  background-repeat: no-repeat;
}
</style>
