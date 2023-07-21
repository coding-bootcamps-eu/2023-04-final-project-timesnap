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
        @search-tag="searchResult"
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
      this.searchVideos.detailPage = this.searchVideos.videos.filter(
        (video) => video.id === id
      );
      this.$router.push(`/videos/${id}`);
    },
    searchResult(value) {
      useSearchStore().currentSearch = value;
      this.$router.push({
        path: "/search-result",
        query: { search: value },
      });
    },
  },
  mounted() {
    useSearchStore().currentSearch = this.searchResults;
  },
};
</script>
