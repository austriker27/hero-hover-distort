<template>
  <div id="app">
      <PixiContainer/>
  </div>
</template>

<script>
import PixiContainer from './components/PixiContainer.vue'

export default {
  name: 'App',
  components: {
    PixiContainer
  }
}
</script>

<style>
html, body {
    height: 100vh;
    width: 100vw;
    margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
* {
  box-sizing: border-box;
}

</style>
