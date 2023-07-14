<template>
  <div>
    <video-player
      :options="videoOptions"
      :youtubeVideoId="youtubeVideoId"
      :timeStamp="timeStamp"
    />
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import "../../node_modules/video.js/dist/video.js";
import "@/assets/js/Youtube.js";

export default {
  name: "VideoComponent",
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
    youtubeVideoId: {
      type: String,
      required: true,
    },
    timeStamp: {
      type: Number,
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
