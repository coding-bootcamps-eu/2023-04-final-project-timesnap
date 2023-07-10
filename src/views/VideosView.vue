<template>
  <div class="videos">
    <h1>Video Overview</h1>
  </div>
  <div v-for="{ videoUrl, id } in video" :key="id">
    <VideoComponent :videoUrl="videoUrl" :videoType="typeSwitch(videoUrl)" />
  </div>
</template>

<script>
import VideoComponent from "@/components/VideoComponent.vue";

export default {
  name: "HomeView",
  components: {
    VideoComponent,
  },
  data() {
    return {
      video: [],
    };
  },
  methods: {
    typeSwitch(value) {
      if (value.includes("youtube")) {
        return "video/youtube";
      } else {
        return "video/mp4";
      }
    },
  },
  async mounted() {
    const response = await fetch("http://localhost:3333/videos");
    const data = await response.json();
    this.video = data;
  },
};
</script>
