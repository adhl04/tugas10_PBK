<template>
  <div class="form-container">
    <h1>{{ isEditing ? 'Edit Produk' : 'Tambah Produk Baru' }}</h1>
    
    <div v-if="isLoading" class="loading-message">
      Memuat data produk...
    </div>

    <form v-else @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Nama Produk</label>
        <input type="text" id="name" v-model="product.name" required />
      </div>
      <div class="form-group">
        <label for="description">Deskripsi</label>
        <textarea id="description" v-model="product.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="price">Harga</label>
        <input type="number" id="price" v-model.number="product.price" required />
      </div>
      <div class="form-group">
        <label for="image_url">URL Gambar</label>
        <input type="text" id="image_url" v-model="product.image_url" required />
      </div>
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah Produk') }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const productId = ref(route.params.id);
const isLoading = ref(true);
const isSubmitting = ref(false);

const isEditing = computed(() => !!productId.value);

const product = ref({
  name: '',
  description: '',
  price: 0,
  image_url: ''
});

onMounted(async () => {
  if (isEditing.value) {
    try {
      const response = await fetch(`http://localhost:3000/cat_foods/${productId.value}`);
      if (!response.ok) {
        throw new Error(`Produk dengan ID ${productId.value} tidak ditemukan.`);
      }
      product.value = await response.json();
    } catch (error) {
      console.error('Gagal mengambil data produk:', error);
      alert(error.message);
      router.push("/foods_cat's");
    } finally {
      isLoading.value = false;
    }
  } else {
    isLoading.value = false;
  }
});

const handleSubmit = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;

  try {
    const url = isEditing.value 
      ? `http://localhost:3000/cat_foods/${productId.value}` 
      : 'http://localhost:3000/cat_foods';
    
    const method = isEditing.value ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product.value)
    });

    if (!response.ok) {
        throw new Error(`Gagal menyimpan. Server merespons dengan status: ${response.status}`);
    }

    alert('Produk berhasil disimpan!');
    router.push("/foods_cat's");

  } catch (error) {
    console.error('Gagal menyimpan produk:', error);
    alert(`Error: ${error.message}`);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* PERBAIKAN: Menambahkan z-index untuk mengangkat form ke lapisan atas */
.form-container { 
  max-width: 600px; 
  margin: 2rem auto; 
  padding: 2rem; 
  border-radius: 8px; 
  box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
  background-color: white; 
  position: relative; /* Diperlukan agar z-index berfungsi */
  z-index: 2; /* Mengangkat elemen ini */
}

.loading-message { text-align: center; padding: 2rem; font-style: italic; }
.form-group { margin-bottom: 1.5rem; }
label { display: block; margin-bottom: 0.5rem; font-weight: bold; }
input, textarea { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
button { width: 100%; padding: 1rem; background-color: #3498db; color: white; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer; transition: background-color 0.3s; }
button:hover { background-color: #2980b9; }
button:disabled { background-color: #a9a9a9; cursor: not-allowed; }
</style>
