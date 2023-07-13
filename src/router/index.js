import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/how-to-use",
    name: "how-to-use",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HowToUseView.vue"),
  },
  {
    path: "/videos",
    name: "videos",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/VideosView.vue"),
  },
  {
    path: "/imprint",
    name: "imprint",
    component: () =>
      import(
        /* webpackChunkName: "Imprint" */ "../views/footer/ImprintView.vue"
      ),
  },
  {
    path: "/privacy",
    name: "privacy",
    component: () =>
      import(
        /* webpackChunkName: "Privacy" */ "../views/footer/PrivacyView.vue"
      ),
  },
  {
    path: "/contact",
    name: "contact",
    component: () =>
      import(
        /* webpackChunkName: "Contact" */ "../views/footer/ContactView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
