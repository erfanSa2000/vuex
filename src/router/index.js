import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "ProductsPage",
      component: () => import("../views/ProductsPage.vue"),
    },
    {
      path: "/product/:id/:slug?",
      name: "Product",
      component: () => import("../views/Product.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/Cart.vue"),
    },
  ],
});

export default router;
