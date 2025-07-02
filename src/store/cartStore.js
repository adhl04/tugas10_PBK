import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// 1. Import authStore untuk mendapatkan ID pengguna yang sedang login
import { useAuthStore } from './authStore';

export const useCartStore = defineStore('cart', () => {
  // STATE: Ini akan menjadi cerminan data keranjang dari server
  const cartItems = ref([])

  // GETTERS (tidak berubah)
  const cartItemCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  const cartTotalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  });

  // ACTIONS (dirombak total untuk berkomunikasi dengan server)

  // Mengambil data keranjang dari server untuk pengguna yang login
  async function fetchCart() {
    const authStore = useAuthStore();
    if (!authStore.user) {
      cartItems.value = []; // Kosongkan keranjang jika tidak ada yang login
      return;
    }
    const userId = authStore.user.id;
    try {
      const response = await fetch(`http://localhost:3000/cart?userId=${userId}`);
      if (!response.ok) throw new Error("Gagal mengambil data keranjang.");
      cartItems.value = await response.json();
    } catch (error) {
      console.error('Gagal mengambil data keranjang:', error);
    }
  }

  // Menambah produk ke keranjang di server
  async function addToCart(product) {
    const authStore = useAuthStore();
    if (!authStore.user) {
        alert("Anda harus login untuk menambahkan item.");
        return;
    }
    const userId = authStore.user.id;
    const existingItem = cartItems.value.find(item => item.productId === product.id);

    if (existingItem) {
      // Jika produk sudah ada, update kuantitasnya (PATCH)
      const newQuantity = existingItem.quantity + 1;
      try {
        await fetch(`http://localhost:3000/cart/${existingItem.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: newQuantity })
        });
        await fetchCart(); // Muat ulang keranjang dari server
      } catch (error) {
        console.error('Gagal memperbarui kuantitas:', error);
      }
    } else {
      // Jika produk baru, tambahkan ke server (POST)
      const newItem = {
        userId: userId,
        productId: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        quantity: 1
      };
      try {
        await fetch('http://localhost:3000/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem)
        });
        await fetchCart(); // Muat ulang keranjang dari server
      } catch (error) {
        console.error('Gagal menambahkan item ke keranjang:', error);
      }
    }
  }

  // Menghapus item dari keranjang di server
  async function removeFromCart(cartItemId) {
    try {
      await fetch(`http://localhost:3000/cart/${cartItemId}`, {
        method: 'DELETE'
      });
      await fetchCart(); // Muat ulang keranjang
    } catch (error) {
      console.error('Gagal menghapus item:', error);
    }
  }

  // Menambah kuantitas di server
  async function incrementQuantity(cartItemId) {
    const item = cartItems.value.find(i => i.id === cartItemId);
    if (!item) return;
    const newQuantity = item.quantity + 1;
    try {
      await fetch(`http://localhost:3000/cart/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
      });
      await fetchCart();
    } catch (error) {
      console.error('Gagal menambah kuantitas:', error);
    }
  }

  // Mengurangi kuantitas di server
  async function decrementQuantity(cartItemId) {
    const item = cartItems.value.find(i => i.id === cartItemId);
    if (!item) return;

    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      try {
        await fetch(`http://localhost:3000/cart/${item.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: newQuantity })
        });
        await fetchCart();
      } catch (error) {
        console.error('Gagal mengurangi kuantitas:', error);
      }
    } else {
      // Jika kuantitas 1, hapus item
      await removeFromCart(cartItemId);
    }
  }

  // Mengosongkan keranjang (hanya state lokal, perlu logika server tambahan jika diperlukan)
  function clearCart() {
    cartItems.value = [];
  }

  return { 
    cartItems, 
    cartItemCount, 
    cartTotalPrice, 
    fetchCart,
    addToCart, 
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart
  }
})
