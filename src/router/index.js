import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import ProductsPage from "../pages/Products.vue";
import AppLayout from "../layouts/AppLayout.vue";
import { useAuthStore } from "../stores/auth";
import ViewProduct from "../pages/ViewProduct.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },

  {
    path: "/",
    component: AppLayout,
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      if (!auth.isAuthenticated) next("/login");
      else next();
    },

    children: [
      {
        path: "products",
        name: "Products",
        component: ProductsPage,
      },
      {
        path: "products/new",
        name: "AddProduct",
        component: () => import("../pages/AddProduct.vue"),
      },
      {
        path: "products/:id",
        name: "ViewProduct",
        component: ViewProduct,
      },
      {
        path: "products/:id/edit",
        name: "EditProduct",
        component: () => import("../pages/EditProduct.vue"),
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: { template: "<div>Dashboard</div>" },
      },
      {
        path: "orders",
        name: "Orders",
        component: { template: "<div>Orders</div>" },
      },
      {
        path: "customers",
        name: "Customers",
        component: { template: "<div>Customers</div>" },
      },
      {
        path: "settings",
        name: "Settings",
        component: { template: "<div>Settings</div>" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory('/vue_product_management/'),  // ✅ FIXED
  routes,
});

export default router;
