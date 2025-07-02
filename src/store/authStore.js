import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// Menggunakan gaya Composition API (setup function) untuk store
export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  // =======================================================
  // STATE
  // Inisialisasi state langsung dari localStorage.
  // Ini cara modern untuk menjaga sesi login tetap ada saat halaman di-refresh.
  // =======================================================
  const user = ref(JSON.parse(localStorage.getItem('user-data')) || null);
  const token = ref(localStorage.getItem('user-token') || null);

  // =======================================================
  // GETTERS (menggunakan computed)
  // =======================================================

  // Getter untuk memeriksa apakah pengguna sudah login
  const isAuthenticated = computed(() => !!token.value && !!user.value);

  // Getter BARU untuk memeriksa apakah pengguna adalah admin
  const isAdmin = computed(() => user.value && user.value.role === 'admin');

  // =======================================================
  // ACTIONS
  // =======================================================

  /**
   * Aksi untuk menangani proses login pengguna.
   * @param {string} email - Email yang dimasukkan pengguna.
   * @param {string} password - Password yang dimasukkan pengguna.
   */
  async function login(email, password) {
    try {
      // 1. Ambil data pengguna dari db.json (pastikan URL dan endpoint benar)
      const response = await fetch('http://localhost:3000/users'); 
      if (!response.ok) {
        throw new Error('Gagal terhubung ke server.');
      }
      const usersData = await response.json();

      // 2. Cari pengguna berdasarkan email dan password
      const foundUser = usersData.find(
        (u) => u.email === email && u.password === password
      );

      // 3. Jika pengguna ditemukan
      if (foundUser) {
        // 4. Siapkan data yang akan disimpan
        const userData = { 
          id: foundUser.id, 
          email: foundUser.email, 
          name: foundUser.name,
          role: foundUser.role // Pastikan ada properti 'role' di db.json Anda
        };
        const userToken = `fake-jwt-token-for-${foundUser.email}`;

        // 5. Simpan data ke state Pinia
        user.value = userData;
        token.value = userToken;

        // 6. Simpan juga ke localStorage agar sesi login tidak hilang
        localStorage.setItem('user-data', JSON.stringify(userData));
        localStorage.setItem('user-token', userToken);
        
        console.log('Login berhasil sebagai:', userData.role);

        // 7. Arahkan ke halaman utama setelah login berhasil
        router.push('/');
      } else {
        // 8. Jika tidak ditemukan, lempar error
        throw new Error('Email atau password salah.');
      }
    } catch (error) {
      console.error('Gagal melakukan login:', error);
      // Lempar lagi error agar bisa ditangkap di komponen Login.vue
      throw error;
    }
  }

  /**
   * Aksi untuk logout.
   */
  function logout() {
    // Kosongkan semua data dari state Pinia
    user.value = null;
    token.value = null;

    // Hapus juga dari localStorage
    localStorage.removeItem('user-data');
    localStorage.removeItem('user-token');

    // Arahkan kembali ke halaman login untuk pengalaman pengguna yang jelas
    router.push('/login');
  }

  // =======================================================
  // Expose state, getters, dan actions agar bisa digunakan di komponen
  // =======================================================
  return { user, token, isAuthenticated, isAdmin, login, logout };
});
