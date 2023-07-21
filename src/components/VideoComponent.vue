<template>
  <div>
    <video-player
      :options="videoOptions"
      :youtubeVideoId="youtubeVideoId"
      :timeStamp="timeStamp"
      :getTime="getTime"
      @currentTime="sendCurrentTime"
      ref="videoPlayer"
      :videoWidth="videoWidth"
      class="video-container"
    />
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import "../../node_modules/video.js/dist/video.js";
import "@/assets/js/Youtube.js";

export default {
  name: "VideoComponent",
  emits: ["current-time"],
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
    getTime: {
      type: Boolean,
    },
    videoWidth: {
      type: undefined,
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
  methods: {
    sendCurrentTime(data) {
      this.$emit("current-time", data);
    },
  },
};
</script>
