<template>
  <div class="login-page-wrapper">
    <div class="login-container">
      <h2>Login</h2>

      <!-- Form sekarang memanggil method handleLogin -->
      <form @submit.prevent="handleLogin">
        <div class="input-box">
          <i class="bx bxs-user"></i>
          <!-- Menggunakan v-model="email" (lebih sesuai untuk login) -->
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>

        <div class="input-box">
          <i class="bx bxs-lock-alt"></i>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <div class="options">
          <label><input type="checkbox" /> Remember me</label>
          <a href="#">Forgot password?</a>
        </div>

        <div class="button-wrapper">
          <button type="submit">Login</button>
        </div>

        <p class="register-text">
          Don’t have an account?
          <router-link to="/register">Register</router-link>
        </p>

        <!-- Menampilkan pesan error dari store atau proses login -->
        <p v-if="loginError" class="error-message">{{ loginError }}</p>
      </form>
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
// Perubahan: Menggunakan alias '@' untuk path yang lebih konsisten
import { useAuthStore } from "../store/authStore"; 

export default {
  name: "Login",
  setup() {
    // Inisialisasi store Pinia
    const authStore = useAuthStore();

    const email = ref("");
    const password = ref("");
    const loginError = ref(""); // Variabel untuk menampung pesan error

    // Fungsi untuk menangani submit form
    const handleLogin = async () => { 
      loginError.value = ""; // Reset pesan error setiap kali mencoba login
      try {
        // Panggil action 'login' dari store
        await authStore.login(email.value, password.value);
        // Navigasi/redirect (router.push) sekarang ditangani di dalam store
      } catch (err) {
        // Tangkap error yang dilempar dari store jika login gagal
        loginError.value = err.message || "Terjadi kesalahan saat login.";
      }
    };

    return {
      email,
      password,
      loginError,
      handleLogin,
    };
  },
};
</script>

<style scoped>
@import '../Style/Login.css';

.error-message {
  color: red;
  text-align: center;
  margin-top: 15px;
}
</style>
