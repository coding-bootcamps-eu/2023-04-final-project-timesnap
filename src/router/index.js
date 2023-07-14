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
        /* webpackChunkName: "imprint" */ "../views/footer/ImprintView.vue"
      ),
  },
  {
    path: "/privacy",
    name: "privacy",
    component: () =>
      import(
        /* webpackChunkName: "privacy" */ "../views/footer/PrivacyView.vue"
      ),
  },
  {
    path: "/contact",
    name: "contact",
    component: () =>
      import(
        /* webpackChunkName: "contact" */ "../views/footer/ContactView.vue"
      ),
  },
  {
    path: "/video-detail",
    name: "video-detail",
    component: () =>
      import(/* webpackChunkName: "video-detail" */ "../views/VideoDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
