<template>
  <div ref="videoContainer"></div>
</template>

<script>
export default {
  props: {
    youtubeVideoId: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Number,
      default: 0,
    },
  },
  name: "VideoPlayer",
  data() {
    return {
      player: null,
    };
  },
  watch: {
    timestamp(newTimestamp) {
      console.log(newTimestamp);
    },
  },
  mounted() {
    this.loadYouTubeAPI().then(() => {
      // eslint-disable-next-line no-undef
      this.player = new YT.Player(this.$refs.videoContainer, {
        videoId: this.youtubeVideoId,
        events: {
          onReady: () => {
            console.log("YouTube player ready");
          },
        },
      });
    });
  },
  methods: {
    loadYouTubeAPI() {
      return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
          resolve();
        } else {
          const tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api";
          const firstScriptTag = document.getElementsByTagName("script")[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          window.onYouTubeIframeAPIReady = resolve;
        }
      });
    },
  },
};
</script>

<style scoped>
.timeStampsContainer {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.timeStamp {
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-gap: 2em;
}
</style>
