<template>
  <div class="foodscats-container">
    <h1 class="foodscats-title">Premium Cat Foods</h1>
    <p class="foodscats-description">
      Discover our exclusive selection of cat foods designed to meet every feline's unique dietary needs. From kitten formulas to senior blends, and special diets, ensure your cat gets the best nutrition for a happy, healthy life.
    </p>

    <!-- Tombol untuk menambah produk baru, hanya untuk admin -->
    <div v-if="authStore.isAdmin" class="admin-actions">
        <button @click="goToAddProduct" class="add-product-button">Tambah Produk Baru</button>
    </div>

    <div 
      v-for="food in catFoods" 
      :key="food.id" 
      class="product-item"
    >
      <div class="product-image-wrapper">
        <img :src="food.image_url" :alt="food.name" class="product-image" />
      </div>
      <div class="product-details">
        <h2 class="product-name">{{ food.name }}</h2>
        <p class="product-text">
          {{ food.description }}
        </p>
        <p v-if="food.price" class="product-price">Rp {{ food.price.toLocaleString('id-ID') }}</p>
        
        <button @click="handleAddToCart(food)" class="product-button">
          Tambah ke Keranjang
        </button>

        <div v-if="authStore.isAdmin" class="admin-buttons">
          <button @click="goToEdit(food.id)" class="edit-button">Edit</button>
          <button @click="handleDelete(food.id)" class="delete-button">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';

export default {
  name: 'FoodsCatsView',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    return { router, authStore };
  },
  data() {
    return {
      catFoods: [],
    };
  },
  mounted() {
    this.fetchCatFoods();
  },
  methods: {
    async fetchCatFoods() {
      try {
        const response = await fetch('https://muhammad-aidhil.glitch.me/cat_foods');
        if (!response.ok) throw new Error('Gagal memuat data produk.');
        this.catFoods = await response.json();
      } catch (error) {
        console.error('Gagal mengambil data makanan kucing:', error);
        alert(error.message);
      }
    },
    handleAddToCart(product) {
      const cartStore = useCartStore();
      cartStore.addToCart(product);
      alert(`${product.name} telah ditambahkan ke keranjang!`);
    },
    async handleDelete(productId) {
      if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        try {
          const response = await fetch(`https://muhammad-aidhil.glitch.me/cat_foods/${productId}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error(`Gagal menghapus. Server merespons dengan status: ${response.status}`);
          }
          alert('Produk berhasil dihapus!');
          this.fetchCatFoods();
        } catch (error) {
          console.error('Gagal menghapus produk:', error);
          alert(`Error: ${error.message}`);
        }
      }
    },
    goToEdit(productId) {
      this.router.push(`/edit-product/${productId}`);
    },
    goToAddProduct() {
      this.router.push('/add-product');
    }
  }
};
</script>

<style scoped>
@import '../Style/Food.css';
.admin-buttons { margin-top: 10px; display: flex; gap: 10px; }
.edit-button, .delete-button { padding: 5px 10px; border: none; cursor: pointer; border-radius: 4px; }
.edit-button { background-color: #f0ad4e; color: white; }
.delete-button { background-color: #d9534f; color: white; }
.product-price { font-weight: bold; margin: 10px 0; font-size: 1.1rem; }

.admin-actions { 
  text-align: center; 
  margin-bottom: 2rem; 
  padding: 10px;
  position: relative;
  z-index: 10; 
}
.add-product-button { 
  padding: 10px 20px; 
  background-color: #27ae60; 
  color: white; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  font-size: 1rem; 
  transition: background-color 0.2s;
}
.add-product-button:hover {
  background-color: #2ecc71;
}

/* PERBAIKAN: Menambahkan z-index untuk mengangkat seluruh detail produk */
.product-details {
  position: relative;
  z-index: 2;
}
</style>
