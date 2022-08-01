<template>
  <h3 class="loading">Loading . . .</h3>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Loading extends Vue {}
</script>


<style lang="less" scoped>
.loading {
  width: 150px;
  height: auto;

  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 45%;
  left: 50%;
  right: -50%;
  transform: translateX(-50%);

  border-radius: 3px;
  box-shadow: 0px 0px 1px 1100px rgba(255, 255, 255, 0.123);
  background: rgba(255, 255, 255, 0.877);

  h3 {
    color: black;
    letter-spacing: 0.1rem;
    font-weight: bold;
  }
}
</style>