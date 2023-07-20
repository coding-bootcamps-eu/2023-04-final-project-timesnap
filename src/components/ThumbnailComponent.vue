<template>
  <img
    :src="ThumbnailId"
    alt="noalt"
    width="640"
    @click.once="loadPlayer"
    v-if="!PlayerOn"
    class="media-container"
  />
  <VideoComponent
    :videoUrl="videoData.videoUrl"
    :videoType="typeSwitch(videoData.videoUrl)"
    :youtubeVideoId="youtubeGetID(videoData.videoUrl)"
    :videoWidth="videoWidth"
    :videoHeight="videoHeight"
    v-if="PlayerOn"
  />
  <article class="info-container">
    <section class="subheader">
      <MainTopicComponent :video="videoData" />
      <KeyTagComponent :video="videoData" />
    </section>
    <h2 @click="videoDetailId" class="clickable">{{ videoData.title }}</h2>
  </article>
</template>

<script>
import MainTopicComponent from "./MainTopicComponent.vue";

import KeyTagComponent from "./KeyTagComponent.vue";

export default {
  data() {
    return {
      ThumbnailId: `https://i.ytimg.com/vi/${this.youtubeGetID(
        this.videoData.videoUrl
      )}/hq720.jpg`,
      PlayerOn: false,
    };
  },
  name: "VideoBlock",
  emits: ["video-data-id"],
  components: {
    MainTopicComponent,
    KeyTagComponent,
  },
  props: {
    videoData: {
      type: Object,
      required: true,
    },
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
      return dateCreate;
    },
    videoDetailId() {
      this.$emit("video-data-id", this.videoData.id);
    },
    loadPlayer() {
      this.PlayerOn = !this.PlayerOn;
    },
  },
};
</script>
<style scoped>
.video-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  width: 100em;
  margin-bottom: 5em;
}
.MainTopicKeyTagContainer {
  margin: 1em 0;
}
.subheader {
  display: flex;
  font-size: 0.75rem;
  gap: 2em;
  justify-content: center;
  padding-left: 3px;
}
h2 {
  margin-top: 0.25em;
  font-size: 2em;
}
.info-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
