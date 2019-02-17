<template>
  <div id="app">
    <CreativeMessage msg="Inside Creative Message"/>
  </div>
</template>

<script>
const Swal = require('sweetalert2')
import HelloWorld from './components/HelloWorld.vue'
import CreativeMessage from './components/CreativeMessage.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    CreativeMessage
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
