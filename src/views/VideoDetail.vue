<template>
  <div class="videos"></div>
  <div v-for="{ videoUrl, id, timeStamps } in video" :key="id">
    <VideoComponent
      :videoUrl="videoUrl"
      :videoType="typeSwitch(videoUrl)"
      :youtubeVideoId="youtubeGetID(videoUrl)"
    /><br />
    <h1>{{ title }}</h1>
    <p v-for="(value, id) in timeStamps" v-bind:key="id">
      {{ value.stampTitle }}
    </p>
  </div>

  <div>
    <p>Video: {{ video.title }}</p>
  </div>

  <br />
  <br />

  <section>
    <h3>TimeStamps</h3>
    <time-stamp-block :videoData="video" />
  </section>

  <time-stamps-container />
</template>

<script>
import VideoComponent from "@/components/VideoComponent.vue";
import TimeStampBlock from "@/components/TimeStampBlock.vue";

export default {
  name: "HomeView",
  components: {
    VideoComponent,
    TimeStampBlock,
  },
  data() {
    return {
      video: [],
    };
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
      console.log(url);
      return undefined !== url[2] ? url[2].split(/[^0-9a-z_-]/i)[0] : url[0];
    },
  },
  async mounted() {
    const response = await fetch("http://localhost:3333/videos");
    const data = await response.json();
    this.video = data.filter((element) => element.id === "fd80beb3");
  },
};
</script>
<style scoped>
.vidContainer {
  margin: 2rem;
}
</style>
