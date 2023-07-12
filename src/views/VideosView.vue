<template>
  <div class="videos">
    <h1>Video Overview</h1>
  </div>
  <div
    class="video-list"
    v-for="{ videoUrl, id, title, tag, createdAt } in video"
    :key="id"
  >
    <VideoComponent :videoUrl="videoUrl" :videoType="typeSwitch(videoUrl)" />
    <div class="h3">
      <h3>Title: {{ title }}</h3>
      <h3>Tags: {{ tag }}</h3>
      <h3>Created: {{ createdAt }}</h3>
    </div>
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
.videos {
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
</style>
