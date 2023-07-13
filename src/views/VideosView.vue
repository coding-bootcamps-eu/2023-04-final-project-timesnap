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
<style>
h2 {
  font-weight: 200;
  color: var(--color-buttons-primary);
  line-height: 1.5;
}
.video-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  width: 100em;
  margin-bottom: 5em;
}
.video-preview {
  margin-bottom: 5em;
}
h3 {
  margin-bottom: 1em;
  font-weight: 300;
  line-height: 1.5;
}
</style>
