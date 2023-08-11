<template>
  <section class="video-list-element-media-container">
    <img
      :src="ThumbnailId"
      alt="noalt"
      @click.once="loadPlayer"
      v-if="!PlayerOn"
      class="thumbnail"
    />
    <VideoComponent
      :videoUrl="videoData.videoUrl"
      :videoType="typeSwitch(videoData.videoUrl)"
      :youtubeVideoId="youtubeGetID(videoData.videoUrl)"
      :videoWidth="videoWidth"
      v-if="PlayerOn"
    />
  </section>
  <section class="video-list-element-info-container">
    <section>
      <MainTopicComponent :video="videoData" class="video-main-topic" />

      <h2 @click="videoDetailId" class="clickable video-title">
        {{ videoData.title }}
      </h2>
      <KeyTagComponent :video="videoData" @search-tag="searchKeytag" />
    </section>
    <p class="creator">
      added by: {{ videoData.creatorName }} ({{
        showCreated(videoData.createdAt)
      }})
    </p>
  </section>
</template>

<script>
import MainTopicComponent from "./MainTopicComponent.vue";
import KeyTagComponent from "./KeyTagComponent.vue";
import VideoComponent from "./VideoComponent.vue";

export default {
  name: "VideoBlock",
  emits: ["video-data-id", "search-tag"],
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
    videoWidth: {
      type: String,
    },
  },
  data() {
    return {
      ThumbnailId: `https://i.ytimg.com/vi/${this.youtubeGetID(
        this.videoData.videoUrl
      )}/hq720.jpg`,
      PlayerOn: false,
    };
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
    searchKeytag(tag) {
      this.$emit("search-tag", tag);
    },
  },
};
</script>
<style scoped>
.video-list {
  display: flex;
  flex-direction: row;
  gap: 1em;
  margin-bottom: 5em;
}

.video-list-element-info-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-left: 1rem;
}

.MainTopicKeyTagContainer {
  margin: 1em 0;
}

.video-main-topic {
  font-weight: 300;
}
.video-title {
  font-weight: 600;
}

.creator {
  font-size: smaller;
  font-style: italic;
}
.keyTagComponent {
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.5em;
}
.thumbnail {
  box-shadow: 5px 4px 16px 0px rgba(140, 131, 131, 0.75);
  -webkit-box-shadow: 5px 4px 16px 0px rgba(140, 131, 131, 0.75);
  -moz-box-shadow: 5px 4px 16px 0px rgba(140, 131, 131, 0.75);
  width: 100%;
  border-radius: 1.5rem;
}
.thumbnail:hover {
  cursor: pointer;
  box-shadow: 0px 3px 33px 8px rgba(61, 170, 207, 0.89);
  -webkit-box-shadow: 0px 3px 33px 8px rgba(61, 170, 207, 0.89);
  -moz-box-shadow: 0px 3px 33px 8px rgba(61, 170, 207, 0.89);
}

@media (min-width: 800px) {
  .thumbnail {
    box-shadow: 5px 4px 16px 0px rgba(140, 131, 131, 0.75);
    -webkit-box-shadow: 5px 4px 16px 0px rgba(140, 131, 131, 0.75);
    -moz-box-shadow: 5px 4px 16px 0px rgba(140, 131, 131, 0.75);
    width: 400px;
    border-radius: 1.5rem;
  }
  .video-list-element-media-container {
    width: 400px;
  }
  .video-list-element-info-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 1rem;
  }
}
</style>
