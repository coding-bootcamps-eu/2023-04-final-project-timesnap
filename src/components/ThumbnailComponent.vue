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
    class="videovideo"
  />
  <article>
    <h2 @click="videoDetailId">{{ videoData.title }}</h2>
    <p>Video added by: {{ videoData.creatorName }}</p>
    <p>Video added on: {{ showCreated(videoData.createdAt) }}</p>
    <div>
      <MainTopicComponent :video="videoData" />
      <KeyTagComponent :video="videoData" />
    </div>
  </article>
</template>

<script>
import MainTopicComponent from "@/components/MainTopicComponent.vue";
import KeyTagComponent from "@/components/KeyTagComponent.vue";
import VideoComponent from "@/components/VideoComponent.vue";

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
    VideoComponent,
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
      let timeCreate = value.match(/\d{2}:\d{2}/g);
      return dateCreate + " - " + timeCreate;
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
h2 {
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

.media-container {
  border-radius: 2em;
}
</style>
