<template>
  <div class="login-page-wrapper">
    <div class="login-container">
      <h2>Login</h2>

      <form @submit.prevent="onSubmit">
        <div class="input-box">
          <i class="bx bxs-user"></i>
          <input
            v-model="username"
            type="text"
            placeholder="Username"
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

        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    </div>
    </div>
    
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import auth from "../auth"; 

export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const username = ref("");
    const password = ref("");
    const error = ref(""); 

    const onSubmit = async () => { 
      error.value = ""; 
      try {
        await auth.login(username.value, password.value);
        router.push("/");
      } catch (err) {
        error.value = err.message || "Terjadi kesalahan saat login.";
      }
    };

    return {
      username,
      password,
      error,
      onSubmit,
    };
  },
};
</script>

<style scoped>
@import '../Style/Login.css';
</style>