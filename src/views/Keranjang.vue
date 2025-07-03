<template>
  <div class="cart-container">
    <h1>Keranjang Belanja Anda</h1>
    <div v-if="cartStore.cartItemCount > 0">
      <div v-for="item in cartStore.cartItems" :key="item.id" class="cart-item">
        <div class="item-details">
          <img :src="item.image_url" :alt="item.name" class="item-image"/>
          <div>
            <h3>{{ item.name }}</h3>
            <p>Harga: Rp {{ item.price.toLocaleString('id-ID') }}</p>
            <p class="item-subtotal">Subtotal: Rp {{ (item.price * item.quantity).toLocaleString('id-ID') }}</p>
          </div>
        </div>
        <div class="item-actions">
          <div class="quantity-controls">
            <button @click="handleDecrement(item.id)" class="quantity-btn">-</button>
            <span class="quantity-display">{{ item.quantity }}</span>
            <button @click="handleIncrement(item.id)" class="quantity-btn">+</button>
          </div>
          <button @click="handleRemoveFromCart(item.id)" class="remove-button">Hapus</button>
        </div>
      </div>
      <div class="cart-summary">
        <h2>Total Belanja: Rp {{ cartStore.cartTotalPrice.toLocaleString('id-ID') }}</h2>
        <button class="checkout-button" @click="handleCheckout">Checkout</button>
      </div>
    </div>
    <div v-else class="empty-cart">
      <p>Keranjang Anda masih kosong.</p>
      <router-link to="/foods_cat's" class="shop-link">Mulai Belanja</router-link>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../store/cartStore';

const cartStore = useCartStore();

const handleIncrement = (productId) => {
    cartStore.incrementQuantity(productId);
}

const handleDecrement = (productId) => {
    cartStore.decrementQuantity(productId);
}

const handleRemoveFromCart = (productId) => {
    if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
        cartStore.removeFromCart(productId);
    }
}

const handleCheckout = () => {
    alert('Fitur checkout belum diimplementasikan!');
}
</script>

<style scoped>
.cart-container { 
  max-width: 900px; 
  margin: 2rem auto; 
  padding: 2rem; 
  background-color: #f9f9f9; 
  border-radius: 8px; 
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
}
h1 { 
  text-align: center; 
  margin-bottom: 2rem; 
  color: #333; 
}
.cart-item { 
  display: flex; 
  flex-wrap: wrap; 
  justify-content: space-between; 
  align-items: center; 
  border-bottom: 1px solid #e0e0e0; 
  padding: 1.5rem 0; 
  gap: 1rem; 
}
.item-details { 
  display: flex; 
  align-items: center; 
  gap: 1.5rem; 
  flex-grow: 1; 
}
.item-image { 
  width: 80px; 
  height: 80px; 
  object-fit: cover; 
  border-radius: 4px; 
}
.item-details h3 { 
  margin: 0; 
  font-size: 1.1rem; 
  color: #2c3e50; 
}
.item-subtotal { 
  font-weight: bold; 
  color: #3498db; 
}

/* PERBAIKAN: Menambahkan z-index untuk mengangkat tombol ke lapisan atas */
.item-actions { 
  display: flex; 
  align-items: center; 
  gap: 1.5rem; 
  position: relative; /* Diperlukan agar z-index berfungsi */
  z-index: 2; /* Mengangkat elemen ini */
}

.quantity-controls { 
  display: flex; 
  -items: center; 
  border: 1px solid #ccc; 
  border-radius: 4px; 
}
.quantity-btn { 
  background-color: #ecf0f1; 
  border: none; 
  padding: 8px 12px; 
  cursor: pointer; 
  font-size: 1.2rem; 
}
.quantity-display { 
  padding: 0 15px; 
  font-size: 1.1rem; 
  font-weight: bold; 
}
.remove-button { 
  background-color: #e74c3c; 
  color: white; 
  border: none; 
  padding: 8px 12px; 
  cursor: pointer; 
  border-radius: 4px; 
  transition: background-color 0.3s; 
}
.remove-button:hover { 
  background-color: #c0392b; 
}
.cart-summary { 
  margin-top: 2rem; 
  text-align: right; 
}
.cart-summary h2 { 
  color: #2c3e50; 
}
.checkout-button { 
  background-color: #27ae60; 
  color: white; 
  border: none; 
  padding: 12px 25px; 
  font-size: 1.2rem; 
  cursor: pointer; 
  border-radius: 4px; 
  transition: background-color 0.3s; 
}
.checkout-button:hover { 
  background-color: #229954; 
}
.empty-cart { 
  text-align: center; 
  padding: 3rem; 
}
.shop-link { 
  display: inline-block; 
  margin-top: 1rem; 
  padding: 10px 20px; 
  background-color: #3498db; 
  color: white; 
  text-decoration: none; 
  border-radius: 4px; 
  }
</style>
