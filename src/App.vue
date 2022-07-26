<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'HomeView' }"></router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="less">
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
