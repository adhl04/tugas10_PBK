import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../authStore'
import { useRouter } from 'vue-router'

// Mock useRouter karena tidak tersedia di lingkungan test Node.js
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}));

// Mock fetch global untuk mengontrol respons API dalam test
// Ini meniru data yang ada di db.json Anda
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
        { email: 'maidhil0@gmail.com', password: 'aidhil123', role: 'admin', id: '34b2' }
    ]),
    ok: true,
  })
);

// Mock localStorage untuk lingkungan test Node.js
const createLocalStorageMock = () => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
};

global.localStorage = createLocalStorageMock();


describe('Auth Store', () => {
  beforeEach(() => {
    // Buat instance Pinia baru untuk setiap test agar bersih
    setActivePinia(createPinia())
    // Bersihkan mock fetch sebelum setiap test
    global.fetch.mockClear();
    // Bersihkan localStorage (sekarang menggunakan mock)
    localStorage.clear();
  })

  it('nilai default untuk user dan token adalah null', () => {
    const authStore = useAuthStore()
    expect(authStore.user).toBe(null)
    expect(authStore.token).toBe(null)
  })

  it('login() berhasil menyimpan data user dan token', async () => {
    const authStore = useAuthStore()
    
    // Panggil action login dengan data yang valid
    await authStore.login('maidhil0@gmail.com', 'aidhil123')

    // Cek apakah state user dan token sudah terisi dengan benar
    expect(authStore.user).toEqual({ email: 'maidhil0@gmail.com', role: 'admin', id: '34b2' })
    expect(authStore.token).not.toBeNull()
    expect(authStore.isAuthenticated).toBe(true)
  })
  
  it('login() gagal dengan kredensial yang salah', async () => {
    const authStore = useAuthStore()

    // Coba login dengan password yang salah
    // 'toThrow' digunakan untuk mengecek apakah sebuah fungsi melempar error
    await expect(authStore.login('maidhil0@gmail.com', 'passwordsalah'))
      .rejects.toThrow('Email atau password salah');

    // Pastikan state tetap null setelah login gagal
    expect(authStore.user).toBeNull()
    expect(authStore.token).toBeNull()
  })

  it('logout() menghapus user dan token menjadi null', async () => {
    const authStore = useAuthStore()
    
    // Login dulu
    await authStore.login('maidhil0@gmail.com', 'aidhil123') 
    expect(authStore.isAuthenticated).toBe(true)

    // Lalu logout
    authStore.logout() 

    // Cek apakah state sudah kembali null
    expect(authStore.user).toBeNull()
    expect(authStore.token).toBeNull()
    expect(authStore.isAuthenticated).toBe(false)
  })
})
