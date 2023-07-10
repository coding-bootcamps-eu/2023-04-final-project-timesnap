<template>
  <div class="videos">
    <h1>Video Overview</h1>
    <div v-for="video in videoStore.videos" v-bind:key="video.id">
      <test-article-component :bla="video" />

      <br />
      <br />
    </div>
  </div>
</template>

<script>
import { useVideoStore } from "@/stores/VideoStore.js";
import TestArticleComponent from "@/components/TestArticleComponent.vue";
export default {
  components: { TestArticleComponent },
  data() {
    const videoStore = useVideoStore();

    //fetch videos
    videoStore.getVideos();
    return { videoStore };
  },
};
</script>
