<template>
  <div>
    <div ref="videoContainer"></div>
    <div class="timeStampsContainer"></div>
  </div>
</template>

<script>
export default {
  props: {
    youtubeVideoId: {
      type: String,
      required: true,
    },
  },
  name: "VideoPlayer",
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.loadYouTubeAPI().then(() => {
      // eslint-disable-next-line no-undef
      this.player = new YT.Player(this.$refs.videoContainer, {
        width: "80%",
        videoId: this.youtubeVideoId, // Replace with the YouTube video ID
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
    jumpToTimestamp50() {
      if (this.player) {
        this.player.seekTo(50, true);
      }
    },
    jumpToTimestamp120() {
      if (this.player) {
        this.player.seekTo(120, true);
      }
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
