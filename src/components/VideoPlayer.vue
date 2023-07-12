<template>
  <div>
    <div ref="videoContainer"></div>
    <button @click="jumpToTimestamp50">Jump to 50 sekunden</button>
    <button @click="jumpToTimestamp120">Jump to 120 sekunden</button>
  </div>
</template>

<script>
export default {
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
        videoId: "u0B9dysw29A", // Replace with the YouTube video ID
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
@import url("video.js/dist/video-js.css");
</style>
