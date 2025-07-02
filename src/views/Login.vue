<template>
  <div class="login-page-wrapper">
    <div class="login-container">
      <h2>Login</h2>

      <!-- Form login asli Anda tetap dipertahankan -->
      <form @submit.prevent="handleLogin">
        <div class="input-box">
          <i class="bx bxs-user"></i>
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

        <p v-if="loginError" class="error-message">{{ loginError }}</p>
      </form>

      <!-- ======================================================= -->
      <!-- PERUBAHAN: Bagian teks demo ditambahkan di sini -->
      <!-- ======================================================= -->
      <div class="demo-credentials">
        <h4>Akun yang bisa digunakan untuk Demo:</h4>
        <ul>
          <li>
            <strong>Email:</strong> maidhil0@gmail.com | <strong>Password:</strong> aidhil123
            <span class="admin-badge">(Admin)</span>
          </li>
        </ul>
      </div>

      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    </div>
  </div>
</template>

<script>
// Bagian script asli Anda tidak perlu diubah
import { ref } from "vue";
import { useAuthStore } from "../store/authStore"; 

export default {
  name: "Login",
  setup() {
    const authStore = useAuthStore();
    const email = ref("");
    const password = ref("");
    const loginError = ref("");

    const handleLogin = async () => { 
      loginError.value = "";
      try {
        await authStore.login(email.value, password.value);
      } catch (err) {
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
/* Style asli Anda dipertahankan */
@import '../Style/Login.css';

.error-message {
  color: red;
  text-align: center;
  margin-top: 15px;
}

/* PERUBAHAN: Style untuk kotak akun demo ditambahkan di sini */
.demo-credentials {
  margin-top: 25px;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: left;
  font-size: 0.9rem;
  color: #fff;
}

.demo-credentials h4 {
  margin-top: 0;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 600;
}

.demo-credentials ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.demo-credentials li {
  margin-bottom: 8px;
}

.admin-badge {
  background-color: #e74c3c;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  margin-left: 5px;
}
</style>
