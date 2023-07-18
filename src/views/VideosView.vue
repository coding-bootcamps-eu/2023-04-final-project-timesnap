<template>
  <main>
    <h1>Video Overview</h1>
    <default-btn btnText="add new video" @click="openAddVideoPage" />
    <section class="video-preview" v-for="video in videos" :key="video.id">
      <VideoBlock :videoData="video" @videoDataId="videoDetailPage" />
    </section>
  </main>
</template>

<script>
import VideoBlock from "@/components/VideoBlock.vue";

import DefaultBtn from "@/components/DefaultBtn.vue";

export default {
  name: "VideoView",
  components: {
    VideoBlock,
    DefaultBtn,
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
    videoDetailPage(id) {
      this.$router.push(`/videos/${id}`);
    },
    openAddVideoPage() {
      this.$router.push(`/add-new-video`);
    },
  },
  async mounted() {
    const response = await fetch("http://localhost:3333/videos");
    const data = await response.json();
    this.videos = data;
  },
};
</script>
