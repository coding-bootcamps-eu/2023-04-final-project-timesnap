<template>
  <VideoComponent
    :videoUrl="videoData.videoUrl"
    :videoType="typeSwitch(videoData.videoUrl)"
    :youtubeVideoId="youtubeGetID(videoData.videoUrl)"
  />
  <article>
    <h2 @click="videoDetailId" class="video-title">{{ videoData.title }}</h2>
    <h3>{{ videoData.creatorName }}</h3>
    <p>{{ showCreated(videoData.createdAt) }}</p>
    <div>
      <MainTopicComponent :video="videoData" />
      <KeyTagComponent :video="videoData" @search-tag="searchResult" />
    </div>
  </article>
</template>

<script>
import VideoComponent from "@/components/VideoComponent.vue";
import MainTopicComponent from "@/components/MainTopicComponent.vue";
import KeyTagComponent from "@/components//KeyTagComponent.vue";
import { useSearchStore } from "@/stores/SearchStore";

export default {
  name: "VideoBlock",
  emits: ["video-data-id"],
  components: {
    VideoComponent,
    MainTopicComponent,
    KeyTagComponent,
  },
  props: {
    videoData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const searchVideos = useSearchStore();

    //fetch videos
    return { searchVideos };
  },
  computed: {
    filterdKeyTags() {
      const filterIds = this.videoData.keyTagId;
      const filteredTags = this.keyTags.filter((tag) =>
        filterIds.includes(tag.id)
      );
      return filteredTags;
    },
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
    showCreated(value) {
      let dateCreate = value
        .match(/^\d{4}-\d{2}-\d{2}/g)
        .toString()
        .split("-")
        .reverse()
        .join(".");
      let timeCreate = value.match(/\d{2}:\d{2}/g);
      return dateCreate + " - " + timeCreate;
    },
    videoDetailId() {
      this.$emit("video-data-id", this.videoData.id);
    },
    searchResult(value) {
      useSearchStore().currentSearch = value;
      this.$router.push({
        path: "/search-result",
        query: { search: value },
      });
    },
  },
};
</script>
<style scoped>
.video-title {
  font-weight: 200;
  color: var(--color-buttons-primary);
  line-height: 1.5;
  cursor: pointer;
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
