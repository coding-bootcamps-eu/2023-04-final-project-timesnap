<template>
  <div
    ref="videoContainer"
    :style="{ width: videoWidth + 'px', height: videoHeight + 'px' }"
  ></div>
</template>

<script>
export default {
  props: {
    youtubeVideoId: {
      type: String,
      required: true,
    },
    timeStamp: {
      type: Number,
    },
    videoWidth: {
      type: Number,
      default: 640,
    },
    videoHeight: {
      type: Number,
      default: 360,
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
    timeStampJump() {
      if (this.timeStamp) {
        this.player.seekTo(this.timeStamp, true);
      }
    },
  },
  watch: {
    timeStamp() {
      this.timeStampJump();
    },
  },
};
</script>
