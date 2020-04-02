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
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html, body {
    height: 100vh;
    width: 100vw;
    margin: 0;
}

</style>
