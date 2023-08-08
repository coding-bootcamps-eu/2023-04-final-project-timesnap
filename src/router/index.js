import { useSearchStore } from "@/stores/SearchStore";
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
    path: "/faq",
    name: "faq",
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
    path: "/videos/:id",
    name: "video-detail",
    component: () =>
      import(/* webpackChunkName: "video-detail" */ "../views/VideoDetail.vue"),
  },
  {
    path: "/add-new-video",
    name: "add-new-video",
    component: () =>
      import(
        /* webpackChunkName: "add-new-video" */ "../views/AddNewVideo.vue"
      ),
  },
  {
    path: "/search-result",
    name: "search-result",
    component: () =>
      import(
        /* webpackChunkName: "search-result" */ "../views/SearchResultView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
router.beforeEach(() => {
  const searchVideos = useSearchStore();
  searchVideos.currentSearch = "";
});
export default router;
