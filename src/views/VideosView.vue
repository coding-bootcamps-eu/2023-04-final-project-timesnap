<template>
  <main>
    <h1>Video Overview</h1>
    <div class="filter-container">
      <div class="dropdown-wrapper">
        <label class="label" for="mainTopic">Main Topic:</label>
        <select
          class="dropdown"
          id="mainTopic"
          v-model="searchVideos.groupFilter"
          @change="applyFilters"
        >
          <option value="">Alle</option>
          <option
            v-for="group in searchVideos.groups"
            :value="group.id"
            :key="group.id"
          >
            {{ group.title }}
          </option>
        </select>
        <label class="label" for="tags">Tags:</label>
        <select
          class="dropdown"
          id="tags"
          v-model="searchVideos.tagFilter"
          @change="applyFilters"
        >
          <option value="">Alle</option>
          <option
            v-for="tag in searchVideos.keyTags"
            :value="tag.id"
            :key="tag.id"
          >
            {{ tag.tag }}
          </option>
        </select>
      </div>
    </div>
    <default-btn btnText="add new video" @click="openAddVideoPage" />
    <section
      class="thumbnail-component"
      v-for="video in searchVideos.filterResult"
      :key="video.id"
    >
      <thumbnail-component
        :videoData="video"
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
<style scoped>
h1 {
  margin-bottom: 3rem;
}
.video-preview {
  margin-bottom: 5rem;
}
.filter-container {
  display: flex;
  align-items: center;
  margin-bottom: 5rem;
}
.dropdown-wrapper {
  display: flex;
  align-items: center;
}
.label {
  margin-right: 8px;
  font-weight: bold;
  color: #333;
}
.dropdown {
  background-color: #fff;
  color: #0080c0;
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid #0080c0;
  border-radius: 5px;
  margin-right: 10px;
}
.dropdown option {
  background-color: #fff;
  color: #2c3c54;
  padding: 8px 12px;
  border: 1px solid #0080c0;
  border-radius: 5px;
}

.dropdown option:hover {
  background-color: #2c3c54;
  max-height: 15px;
  overflow-y: auto;
}
</style>
