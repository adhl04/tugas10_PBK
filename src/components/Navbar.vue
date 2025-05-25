<template>
  <div class="Navbar-page-wrapper">
    <nav class="main-navbar">
      <div class="navbar-left">
        <div class="navbar-brand">
          <router-link to="/">Cat's Store Aidhil</router-link>
        </div>

        <button v-if="canGoBack" @click="goBack" class="back-button">
          &lt;
        </button>
      </div>

      <ul class="navbar-links">
        <li><router-link to="/" exact-active-class="active">Home</router-link></li>
        <li><router-link to="/Pet_Shop" exact-active-class="active">Pet Shop</router-link></li>
        <li><router-link to="/Foods_Cat's" exact-active-class="active">Foods Cat's</router-link></li>

        <li v-if="!isLoggedIn">
          <router-link to="/login" exact-active-class="active">Login</router-link>
        </li>
        <li v-else>
          <a href="#" @click.prevent="logout">Logout</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'; 
import { useRouter, useRoute } from 'vue-router';
import auth from '../auth'; 

const router = useRouter();
const route = useRoute();

// isLoggedIn akan secara otomatis reaktif karena terikat dengan auth.isAuthenticated.value
const isLoggedIn = computed(() => auth.isAuthenticated.value);

const goBack = () => {
  router.back();
};

const canGoBack = computed(() => {
  // Tambahkan '/login' dan '/register' ke rute awal agar tombol back tidak muncul di sana
  const initialRoutes = ['/', '/home', '/login', '/register'];
  return window.history.length > 1 && !initialRoutes.includes(route.path);
});

const logout = () => {
  auth.logout();
  // isLoggedIn akan otomatis diperbarui karena terikat dengan auth.isAuthenticated.value
  router.push('/'); // Setelah logout, arahkan ke Home
};
</script>

<style scoped>
@import '../Style/Navbar.css';
</style>