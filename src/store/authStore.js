import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Nama 'useAuthStore' adalah konvensi umum untuk store otentikasi
export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  // STATE: Inisialisasi state dari localStorage saat store dibuat.
  const user = ref(JSON.parse(localStorage.getItem('user')))
  const token = ref(localStorage.getItem('token'))

  // GETTER BARU: Untuk mengecek apakah pengguna adalah admin
  const isAdmin = computed(() => user.value && user.value.role === 'admin');

  // GETTERS: Mengecek status login berdasarkan data yang ada.
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // ACTIONS: Fungsi untuk mengubah state (login/logout)
  async function login(email, password) {
    try {
      // Ganti URL ini dengan endpoint login dari db.json Anda
      const response = await fetch('http://localhost:3000/user') 
      const usersData = await response.json()

      // Cari pengguna berdasarkan email dan password
      const foundUser = usersData.find(
        (u) => u.email === email && u.password === password
      )

      if (foundUser) {
        // PERUBAHAN: Simpan semua data user yang relevan, termasuk role
        const userData = { email: foundUser.email, role: foundUser.role };
        const userToken = `fake-jwt-token-for-${foundUser.email}`;

        // Jika ditemukan, simpan data ke state Pinia
        user.value = userData
        token.value = userToken

        // Simpan juga ke localStorage agar persisten
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userToken);

        // Arahkan ke halaman utama setelah login berhasil
        router.push('/')
        console.log('Login berhasil!')
      } else {
        // Jika tidak ditemukan, lempar error
        throw new Error('Email atau password salah')
      }
    } catch (error) {
      console.error('Gagal melakukan login:', error)
      // Lempar lagi error agar bisa ditangkap di komponen Login.vue
      throw error
    }
  }

  function logout() {
    // Kosongkan semua data saat logout dari state Pinia
    user.value = null
    token.value = null

    // Hapus juga dari localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Arahkan kembali ke halaman login
    router.push('/login')
  }

  // PERUBAHAN: Return semua state, termasuk getter isAdmin
  return { user, token, isAuthenticated, isAdmin, login, logout }
})
