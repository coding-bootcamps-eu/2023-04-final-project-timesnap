<template>
  <div ref="videoContainer"></div>
</template>

<script>
export default {
  name: "VideoPlayer",
  props: {
    youtubeVideoId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      player: null,
    };
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
@import url("video.js/dist/video-js.css");
</style>
