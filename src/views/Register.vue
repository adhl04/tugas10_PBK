<template>
  <div class="register-container">
    <h2 class="register-title">Register</h2>

    <form @submit.prevent="onRegister">
      <div class="input-box">
        <input v-model="username" type="text" placeholder="Username" required />
        <i class="bx bxs-user"></i>
      </div>
      <div class="input-box">
        <input v-model="email" type="email" placeholder="Email" required />
        <i class="bx bxs-envelope"></i>
      </div>
      <div class="input-box">
        <input v-model="password" type="password" placeholder="Password" required />
        <i class="bx bxs-lock-alt"></i>
      </div>
      <button class="register-button" type="submit">Register</button>
      <p class="login-link">
        Already have an account?
        <router-link to="/">Login</router-link>
      </p>
    </form>
  </div>
  <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    onRegister() {
      // Simpan user ke localStorage atau kirim ke backend (contoh basic)
      console.log('User registered:', this.username, this.email, this.password);
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
@import '../Style/Register.css';
</style>
