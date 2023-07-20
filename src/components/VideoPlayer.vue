<template>
  <div
    ref="videoContainer"
    @click="sendCurrentTime"
    :style="{ width: videoWidth + 'vmax', height: 'auto' }"
  ></div>
</template>

<script>
export default {
  name: "VideoPlayer",
  emits: ["current-time"],
  props: {
    youtubeVideoId: {
      type: String,
      required: true,
    },
    timeStamp: {
      type: Number,
    },
    getTime: {
      type: Boolean,
    },
    videoWidth: {
      type: Number,
    },
    // videoHeight: {
    // type: String,
    //default: 500,
    // },
  },
  data() {
    return {
      player: null,
      currentTime: null,
    };
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
    timeStampJump() {
      if (this.timeStamp) {
        this.player.seekTo(this.timeStamp, true);
      }
    },
    sendCurrentTime() {
      const currentTime = Math.floor(this.player.getCurrentTime());
      if (this.timeStamp !== currentTime && this.getTime) {
        this.currentTime = currentTime;
        return this.player.pauseVideo();
      } else if (this.timeStamp === currentTime) {
        this.currentTime = currentTime;
        return console.log("Timestamp already exists");
      }
    },
  },
  watch: {
    timeStamp() {
      this.timeStampJump();
    },
    getTime() {
      this.sendCurrentTime();
      this.$emit("current-time", this.currentTime);
    },
  },
  mounted() {
    this.loadYouTubeAPI().then(() => {
      // eslint-disable-next-line no-undef
      this.player = new YT.Player(this.$refs.videoContainer, {
        videoId: this.youtubeVideoId,
      });
    });
  },
};
</script>
