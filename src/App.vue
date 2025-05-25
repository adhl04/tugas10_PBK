<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';

const route = useRoute();
const isLoggedIn = computed(() => route.name !== 'Login' && route.name !== 'Register');

</script>

<template>
  <div id="app">
    <Navbar v-if="isLoggedIn" />
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Poppins", sans-serif; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50; 
}

html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box; 
  overflow-x: hidden; 
}
</style>
