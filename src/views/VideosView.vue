<template>
  <main class="grid-container">
    <div class="filter-container">
      <section class="dropdown-wrapper">
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
      </section>
    </div>
    <section>
      <h1>Video Overview</h1>
      <article
        class="thumbnail-component"
        v-for="video in searchVideos.filterResult"
        :key="video.id"
      >
        <thumbnail-component
          :videoData="video"
          @video-data-id="videoDetailPage"
        />
      </article>
    </section>
    <section class="btn-container">
      <default-btn id="btn" btnText="add new video" @click="openAddVideoPage" />
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
      this.searchVideos.detailPage = this.searchVideos.videos.filter(
        (video) => video.id === id
      );
      this.$router.push(`/videos/${id}`);
    },
    openAddVideoPage() {
      this.$router.push(`/add-new-video`);
    },
  },
};
</script>
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  position: relative;
}
.filter-container {
  display: grid;
  justify-items: start;
  margin-left: 1.5rem;
}

.dropdown-container {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 20px;
  max-height: 100px;

  position: relative;
}

.dropdown-wrapper {
  display: flex;
  flex-direction: column;
}
h1 {
  margin-bottom: 3rem;
}
.btn {
  background: var(--color-accent-red-80);
  color: var(--color-buttons-secondary);
  border: none;
  max-width: 200px;
  position: relative;
}
.btn:hover {
  background: var(--color-accent-blue-80);
  color: var(--color-buttons-secondary);
  position: relative;
}
.btn-container {
  display: grid;
  justify-content: 1fr auto;
  position: sticky;
  top: 180px;
  max-height: 50px;
  z-index: 100;
  padding-right: 1.5rem;
}
.video-preview {
  margin-bottom: 5rem;
}

.label {
  font-weight: bold;
  color: #2c3c54;
  margin-bottom: 0.5rem;
}
.dropdown {
  background-color: #fff;
  color: #0080c0;
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid #0080c0;
  border-radius: 5px;
  max-width: 200px;
  margin-bottom: 1.5rem;
}
.dropdown option {
  background-color: #fff;
  color: #2c3c54;
  padding: 8px 12px;
  border: 1px solid #0080c0;
  border-radius: 5px;
}
</style>
