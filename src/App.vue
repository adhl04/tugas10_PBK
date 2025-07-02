<template>
  <div id="app">
    <!-- ======================================================= -->
    <!-- BAGIAN NAVBAR (DARI NAVBAR.VUE) SEKARANG DI SINI -->
    <!-- Navbar ini akan selalu ditampilkan, tidak lagi menggunakan v-if -->
    <!-- ======================================================= -->
    <nav class="main-navbar">
      <div class="navbar-left">
        <div class="navbar-brand">
          <!-- Link ke halaman utama -->
          <router-link to="/">Cat's Store Aidhil</router-link>
        </div>

        <!-- Tombol kembali, logikanya tetap sama -->
        <button v-if="canGoBack" @click="goBack" class="back-button">
          &lt;
        </button>
      </div>

      <!-- Daftar link navigasi -->
      <ul class="navbar-links">
        <li><router-link to="/" exact-active-class="active">Home</router-link></li>
        <li><router-link to="/pet_shop" exact-active-class="active">Pet Shop</router-link></li>
        <li><router-link to="/foods_cat's" exact-active-class="active">Foods Cat's</router-link></li>

        <!-- Link ke keranjang HANYA MUNCUL jika sudah login -->
        <li v-if="isLoggedIn">
          <router-link to="/cart" exact-active-class="active" class="cart-link">
            Keranjang 
            <!-- Badge jumlah item di keranjang -->
            <span v-if="cartStore.cartItemCount > 0" class="cart-count">
              {{ cartStore.cartItemCount }}
            </span>
          </router-link>
        </li>

        <!-- Tombol Login/Logout, logikanya tetap sama -->
        <li v-if="!isLoggedIn">
          <router-link to="/login" exact-active-class="active">Login</router-link>
        </li>
        <li v-else>
          <a href="#" @click.prevent="logout">Logout</a>
        </li>
      </ul>
    </nav>

    <!-- ======================================================= -->
    <!-- KONTEN HALAMAN UTAMA AKAN DI-RENDER DI SINI -->
    <!-- ======================================================= -->
    <router-view />

  </div>
</template>

<script setup>
// =======================================================
// SEMUA LOGIKA JAVASCRIPT DIGABUNGKAN DI SINI
// =======================================================

// 1. Import semua yang dibutuhkan dari Vue, Vue Router, dan Pinia
import { onMounted, computed } from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router';
import { useAuthStore } from './store/authStore'; 
import { useCartStore } from './store/cartStore';

// 2. Inisialisasi semua store dan router
const authStore = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();
const route = useRoute();

// 3. Computed property untuk memeriksa status login (logika dari Navbar.vue)
const isLoggedIn = computed(() => authStore.isAuthenticated);

// 4. Computed property untuk tombol "kembali" (logika dari Navbar.vue)
const canGoBack = computed(() => {
  // Tombol kembali tidak muncul di halaman-halaman awal
  const initialRoutes = ['/', '/home', '/login', '/register'];
  return window.history.length > 1 && !initialRoutes.includes(route.path);
});

// 5. Fungsi untuk tombol "kembali" (logika dari Navbar.vue)
const goBack = () => {
  router.back();
};

// 6. Fungsi logout (logika dari Navbar.vue)
const logout = () => {
  authStore.logout();
  // Arahkan ke halaman login setelah logout untuk pengalaman pengguna yang lebih baik
  router.push('/login');
};

// 7. Lifecycle hook onMounted (logika dari App.vue asli)
// Ini akan berjalan saat aplikasi pertama kali dimuat
onMounted(() => {
  // Cek apakah pengguna sudah login (misal dari session sebelumnya)
  if (authStore.isAuthenticated) {
    console.log("App.vue dimuat: Pengguna terotentikasi, mengambil data keranjang...");
    // Jika ya, ambil data keranjang miliknya dari server
    cartStore.fetchCart();
  } else {
    console.log("App.vue dimuat: Pengguna belum login.");
  }
});
</script>

<style>
/* ======================================================= */
/* STYLE GLOBAL (DARI APP.VUE ASLI) */
/* ======================================================= */
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

<style scoped>
/* ======================================================= */
/* STYLE KHUSUS NAVBAR (DARI NAVBAR.VUE) */
/* 'scoped' berarti style ini hanya berlaku untuk elemen di dalam template ini */
/* ======================================================= */
@import './Style/Navbar.css';

/* Style untuk badge notifikasi keranjang */
.cart-link {
  position: relative;
}
.cart-count {
  position: absolute;
  top: 5px;
  right: -15px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.7rem;
  font-weight: bold;
}
</style>
