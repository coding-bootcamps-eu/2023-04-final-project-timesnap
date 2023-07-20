<template>
  <Navigation />
  <router-view />
  <Footer />
</template>

<script>
import { useSearchStore } from "@/stores/SearchStore.js";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/FooterDefault.vue";

export default {
  components: {
    Navigation,
    Footer,
  },
  setup() {
    const searchVideos = useSearchStore();

    //fetch videos
    searchVideos.getVideos();
  },
};
</script>
