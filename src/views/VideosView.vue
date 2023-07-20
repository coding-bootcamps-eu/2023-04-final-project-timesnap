<template>
  <main>
    <h1>Video Overview</h1>
    <default-btn btnText="add new video" @click="openAddVideoPage" />
    <div class="filter-container">
      <label for="mainTopic">Main Topic:</label>
      <select id="mainTopic" v-model="searchVideos.groupFilter">
        <option value="">Alle</option>
        <option v-for="group in groups" :value="group.id" :key="group.id">
          {{ group.title }}
        </option>
      </select>
      <label for="tags">Tags:</label>
      <select id="tags" v-model="searchVideos.tagFilter">
        <option value="">Alle</option>
        <option v-for="tag in keyTags" :value="tag.id" :key="tag.id">
          {{ tag.tag }}
        </option>
      </select>
    </div>
    <section
      class="thumbnail-component"
      v-for="video in searchVideos.filterResult"
      :key="video.id"
    >
      <thumbnail-component
        :videoData="video"
        :videoWidth="30"
        @video-data-id="videoDetailPage"
      />
    </section>
  </main>
</template>

<script>
import { useSearchStore } from "@/stores/SearchStore";
import ThumbnailComponent from "@/components/ThumbnailComponent.vue";
import DefaultBtn from "@/components/DefaultBtn.vue";

export default {
  name: "VideoView",
  components: {
    ThumbnailComponent,
    DefaultBtn,
  },
  setup() {
    const searchVideos = useSearchStore();

    //fetch videos
    return { searchVideos };
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
};
</script>
<style scoped></style>
