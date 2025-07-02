<script setup>
// 1. Import hook dan store yang diperlukan
import { onMounted, computed } from 'vue';
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import { useAuthStore } from './store/authStore';
import { useCartStore } from './store/cartStore';

// 2. Inisialisasi store
const authStore = useAuthStore();
const cartStore = useCartStore();

// 3. 'isLoggedIn' sekarang mengambil status dari authStore, ini lebih andal
const isLoggedIn = computed(() => authStore.isAuthenticated);

// 4. Saat komponen App pertama kali dimuat...
onMounted(() => {
  // ...jika pengguna sudah terotentikasi (berdasarkan data di localStorage)...
  if (authStore.isAuthenticated) {
    // ...ambil data keranjang miliknya dari server.
    console.log("App.vue mounted: Pengguna terotentikasi, mengambil data keranjang...");
    cartStore.fetchCart();
  }
});
</script>

<template>
  <div id="app">
    <!-- Navbar sekarang ditampilkan berdasarkan status login yang benar -->
    <Navbar v-if="isLoggedIn" />
    <router-view />
  </div>
</template>

<style>
/* Style asli Anda dipertahankan */
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
