<template>
  <main>
    <h1>Search Results</h1>
    <section
      class="thumbnail-component"
      v-for="video in searchVideos.searchResult"
      :key="video.id"
    >
      <thumbnail-component
        :videoData="video"
        @video-data-id="videoDetailPage"
        :videoWidth="30"
      />
    </section>
  </main>
</template>

<script>
import ThumbnailComponent from "@/components/ThumbnailComponent.vue";
import { useSearchStore } from "@/stores/SearchStore";

export default {
  name: "SearchResult",
  data() {
    return {
      searchInput: "",
    };
  },
  setup() {
    const searchVideos = useSearchStore();
    //fetch videos
    return { searchVideos };
  },
  components: {
    ThumbnailComponent,
  },
  computed: {
    searchResults() {
      return this.$route.query.search;
    },
  },
  watch: {
    searchResults(newResults) {
      this.handleSearchResultsChange(newResults);
    },
  },
  methods: {
    handleSearchResultsChange(newResults) {
      useSearchStore().currentSearch = newResults;
    },
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
  },
  mounted() {
    useSearchStore().currentSearch = this.searchResults;
  },
};
</script>
