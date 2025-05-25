// auth.js
import { ref, computed } from 'vue'; 
const isAuthenticated = ref(!!localStorage.getItem('user_token'));
const saveToken = (token) => {
  localStorage.setItem('user_token', token);
  isAuthenticated.value = true;
};

const removeToken = () => {
  localStorage.removeItem('user_token');
  isAuthenticated.value = false;
};

export default {
  isAuthenticated: computed(() => isAuthenticated.value),

  login(username, password) {
    const validUser = 'admin';
    const validPass = '123456';

    return new Promise((resolve, reject) => {
      if (username === validUser && password === validPass) {
        saveToken('dummy_jwt_token_for_admin');
        resolve();
      } else {
        reject(new Error('Username atau Password salah'));
      }
    });
  },

  logout() {
    removeToken();
  },

  getToken() {
    return localStorage.getItem('user_token');
  },
};