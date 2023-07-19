<template>
  <main>
    <h1>Video Overview</h1>
    <default-btn btnText="add new video" @click="openAddVideoPage" />
    <div class="filter-container">
      <label for="mainTopic">Main Topic:</label>
      <select id="mainTopic" v-model="selectedMainTopic" @change="applyFilters">
        <option value="">Alle</option>
        <option v-for="group in groups" :value="group.id" :key="group.id">
          {{ group.title }}
        </option>
      </select>
      <label for="tags">Tags:</label>
      <select id="tags" v-model="selectedTag" @change="applyFilters">
        <option value="">Alle</option>
        <option v-for="tag in keyTags" :value="tag.id" :key="tag.id">
          {{ tag.tag }}
        </option>
      </select>
    </div>
    <section
      class="video-preview"
      v-for="video in filteredVideos"
      :key="video.id"
    >
      <VideoBlock :videoData="video" @video-data-id="videoDetailPage" />
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
      filteredVideos: [],
      selectedMainTopic: "",
      selectedTag: "",
      groups: [],
      keyTags: [],
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
    applyFilters() {
      this.filteredVideos = this.videos.filter((video) => {
        const groupIds = video.groupId;
        const tagIds = video.keyTagId;
        const mainTopicFilter =
          this.selectedMainTopic === "" ||
          groupIds.includes(this.selectedMainTopic) ||
          video.id === this.selectedMainTopic;

        const tagFilter =
          this.selectedTag === "" || tagIds.includes(this.selectedTag);

        return mainTopicFilter && tagFilter;
      });
    },
  },
  async mounted() {
    try {
      const responseVideos = await fetch("http://localhost:3333/videos");
      const responsekeyTags = await fetch("http://localhost:3333/keyTags");
      const responseGroups = await fetch("http://localhost:3333/groups");

      const dataVideos = await responseVideos.json();
      const dataKeyTags = await responsekeyTags.json();
      const dataGroups = await responseGroups.json();

      this.videos = dataVideos;
      this.filteredVideos = dataVideos;
      this.keyTags = dataKeyTags;
      this.groups = dataGroups;
    } catch (error) {
      console.error("Fehler beim Abrufen der Videos:", error);
    }
  },
};
</script>
