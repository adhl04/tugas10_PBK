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
        <li><router-link to="/pet_shop" exact-active-class="active">Pet Shop</router-link></li>
        <li><router-link to="/foods_cat's" exact-active-class="active">Foods Cat's</router-link></li>

        <!-- 1. Link ke keranjang sekarang dinamis dan hanya muncul jika sudah login -->
        <li v-if="isLoggedIn">
          <router-link to="/cart" exact-active-class="active" class="cart-link">
            Keranjang 
            <!-- Menampilkan jumlah item di keranjang -->
            <span v-if="cartStore.cartItemCount > 0" class="cart-count">
              {{ cartStore.cartItemCount }}
            </span>
          </router-link>
        </li>

        <!-- Logika untuk tombol Login/Logout (tidak diubah) -->
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
// Menggunakan Pinia untuk state management
import { useAuthStore } from '../store/authStore'; 
import { useCartStore } from '../store/cartStore'; // 2. Import store untuk keranjang

// Inisialisasi semua store yang dibutuhkan
const authStore = useAuthStore();
const cartStore = useCartStore(); // 3. Inisialisasi cart store
const router = useRouter();
const route = useRoute();

// 'isLoggedIn' sekarang terhubung ke authStore (tidak diubah)
const isLoggedIn = computed(() => authStore.isAuthenticated);

// Logika tombol kembali (tidak diubah)
const goBack = () => {
  router.back();
};

const canGoBack = computed(() => {
  const initialRoutes = ['/', '/home', '/login', '/register'];
  return window.history.length > 1 && !initialRoutes.includes(route.path);
});

// Fungsi logout sekarang memanggil action dari authStore (tidak diubah)
const logout = () => {
  authStore.logout();
};
</script>

<style scoped>
/* Mempertahankan file style asli Anda */
@import '../Style/Navbar.css';

/* 4. Tambahkan style untuk badge keranjang */
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
