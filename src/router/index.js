import { createWebHistory, createRouter } from "vue-router";
// Menggunakan alias '@' untuk path yang lebih bersih dan konsisten
import { useAuthStore } from "../store/authStore";

// Impor komponen Anda
import Home from "../views/Home.vue";
import Pet_Shop from "../views/Pet_Shop.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Foods_CatS from "../views/Foods_Cat's.vue";
import Cart from "../views/Cart.vue";
// 1. Import komponen form untuk Admin
import ProductForm from "../views/ProductForm.vue"; 

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // Halaman ini publik, tidak memerlukan meta
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guestOnly: true } 
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    // 2. Menambahkan meta yang hilang
    meta: { guestOnly: true }
  },
  {
    path: "/pet_shop",
    name: "Pet_Shop",
    component: Pet_Shop,
    // 3. Menambahkan meta yang hilang
    meta: { requiresAuth: true } 
  },
  {
    path: "/foods_cat's",
    name: "Foods_CatS",
    component: Foods_CatS,
    // 4. Menambahkan meta yang hilang
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    // 5. Menambahkan meta yang hilang
    meta: { requiresAuth: true }
  },
  // 6. RUTE BARU UNTUK ADMIN
  { 
    path: '/add-product', 
    name: 'AddProduct', 
    component: ProductForm, 
    meta: { requiresAuth: true, requiresAdmin: true } 
  },
  { 
    path: '/edit-product/:id', 
    name: 'EditProduct', 
    component: ProductForm, 
    meta: { requiresAuth: true, requiresAdmin: true } 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 7. Memperbarui Guard untuk mengecek peran admin
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const isAdmin = authStore.isAdmin;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "Login" });
  } 
  else if (to.meta.guestOnly && isAuthenticated) {
    next({ name: "Home" });
  }
  // Guard baru untuk rute admin
  else if (to.meta.requiresAdmin && !isAdmin) {
    // Jika rute butuh admin tapi pengguna bukan admin, arahkan ke Home
    alert('Anda tidak memiliki akses ke halaman ini!');
    next({ name: "Home" });
  }
  else {
    next();
  }
});

export default router;
