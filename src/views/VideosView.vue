<template>
  <main>
    <h1>Video Overview</h1>
    <section class="video-preview" v-for="video in videos" :key="video.id">
      <VideoBlock :videoData="video" />
    </section>
  </main>
</template>

<script>
import VideoBlock from "@/components/VideoBlock.vue";

export default {
  name: "VideoView",
  components: {
    VideoBlock,
  },
  data() {
    return {
      videos: [],
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
    youtubeGetID(url) {
      url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      return undefined !== url[2] ? url[2].split(/[^0-9a-z_-]/i)[0] : url[0];
    },
  },
  async mounted() {
    const response = await fetch("http://localhost:3333/videos");
    const data = await response.json();
    this.videos = data;
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
