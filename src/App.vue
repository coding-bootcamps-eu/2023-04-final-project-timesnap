<template>
  <Navigation />
  <router-view />
  <Footer />
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/FooterDefault.vue";
export default {
  components: {
    Navigation,
    Footer,
  },
};
</script>
