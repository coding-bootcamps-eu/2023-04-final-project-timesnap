<template>
  <div class="videos"></div>
  <div v-for="(value, id) in video" :key="id">
    <VideoComponent
      :videoUrl="value.videoUrl"
      :videoType="typeSwitch(value.videoUrl)"
      :youtubeVideoId="youtubeGetID(value.videoUrl)"
      :timeStamp="timeStart"
    />
    <section>
      <h2>{{ value.title }}</h2>
      <br />
      <h3>Main Topics:</h3>
      <MainTopicComponent :video="value" />
      <KeyTagComponent :video="value" />
    </section>
    <br />
    <section>
      <h4>TimeStamps</h4>
      <table class="table-item__table">
        <thead>
          <tr>
            <th class="table-item__timeStamp">Timestamp</th>
            <th class="table-item__title">Title</th>
          </tr>
        </thead>
        <tbody>
          <time-stamp-block
            v-for="(value, id) in value.timeStamps"
            v-bind:key="id"
            :timeStart="value.timeStart"
            :stampTitle="value.stampTitle"
            :stampNote="value.stampNote"
            @timeStartData="handleTimeStart"
          />
        </tbody>
        <DefaultBtn v-if="btnText !== 'noBtn'" :btnText="'add new Timestamp'" />
      </table>
    </section>
  </div>
</template>

<script>
import VideoComponent from "@/components/VideoComponent.vue";
import TimeStampBlock from "@/components/TimeStampBlock.vue";
import MainTopicComponent from "@/components/MainTopicComponent.vue";
import KeyTagComponent from "@/components//KeyTagComponent.vue";

export default {
  name: "VideoDetail",
  components: {
    VideoComponent,
    TimeStampBlock,
    MainTopicComponent,
    KeyTagComponent,
  },
  data() {
    return {
      video: [],
      timeStart: 0,
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
      return undefined !== url[2] ? url[2].split(/[^0-9a-z_-]/i)[0] : url[0];
    },
    handleTimeStart(data) {
      this.timeStart = data;
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
body {
  color: var();
}

.vidContainer {
  margin: 2rem;
}
.table-item__table {
  padding: 2rem;
  border: 1px solid var(--color-accent-grey-80);
  border-radius: 2rem;
  width: 80%;
}

.table-item__table thead tr {
  text-align: left;
}

.table-item__timeStamp {
  width: 15%;
}
.table-item__title {
  width: 25%;
}
.table-item__comments {
  width: 60%;
}
.video-details {
  display: grid;
  grid-template-columns: 1fr 4fr;
}
</style>
