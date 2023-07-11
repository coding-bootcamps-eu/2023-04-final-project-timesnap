<template>
  <div>
    <video-player :options="videoOptions" />
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import "../../node_modules/video.js/dist/video.js";
import "@/assets/js/Youtube.js";

export default {
  name: "VideoExample",
  components: {
    VideoPlayer,
  },
  props: {
    videoUrl: {
      type: String,
      required: true,
    },
    videoType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      videoOptions: {
        autoplay: false,
        muted: true,
        controls: true,
        width: 640,
        height: 264,
        techOrder: ["youtube", "html5"],
        sources: [
          {
            src: this.videoUrl,
            type: this.videoType,
          },
        ],
      },
    };
  },
};
</script>
