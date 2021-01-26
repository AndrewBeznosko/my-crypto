<template>
  <div id="app" class="min-vh-100">
    <h1 class="app__header">Введіть держ. номер автомобіля для пошуку</h1> 
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-image: url('~@/assets/img/app_bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  backdrop-filter: blur(2px);
}
</style>
