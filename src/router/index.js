import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Pet_Shop from "../views/Pet_Shop.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import auth from "../auth";
import Foods_CatS from "../views/Foods_Cat's.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: false } 
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false } 
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresAuth: false }
  },
  {
    path: "/pet_shop",
    name: "Pet_Shop",
    component: Pet_Shop,
    meta: { requiresAuth: false } 
  },
  {
    path: "/foods_cat's",
    name: "Foods_CatS",
    component: Foods_CatS,
    meta: { requiresAuth: false }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware Auth
router.beforeEach((to, from, next) => {
  const isAuthenticated = auth.isAuthenticated.value;

  if ((to.name === "Login" & "Register")) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;