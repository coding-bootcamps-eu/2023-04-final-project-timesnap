<template>
  <main>
    <div class="video-details" v-for="(value, id) in video" :key="id">
      <section class="timestamps-table-container">
        <table class="table-item__table">
          <thead>
            <tr>
              <th class="table-item__timeStamp">Timestamp</th>
              <th class="table-item__title">Title</th>
            </tr>
          </thead>
          <tbody>
            <time-stamp-and-title
              v-for="(value, id) in value.timeStamps"
              v-bind:key="id"
              :timeStart="value.timeStart"
              :stampTitle="value.stampTitle"
              :stampNote="value.stampNote"
              @timeStartData="handleTimeStart"
            />
          </tbody>
          <DefaultBtn
            v-if="btnText !== 'noBtn'"
            :btnText="'add new Timestamp'"
          />
        </table>
      </section>
      <VideoComponent
        :videoUrl="value.videoUrl"
        :videoType="typeSwitch(value.videoUrl)"
        :youtubeVideoId="youtubeGetID(value.videoUrl)"
        :timeStamp="timeStart"
      />
      <section>
        <h2>{{ value.title }}</h2>
        <br />

        <MainTopicComponent :video="value" />

        <KeyTagComponent :video="value" />

        <StampNoteComponent
          v-for="(value, id) in value.timeStamps"
          v-bind:key="id"
          :stampNote="value.stampNote"
          class="comments"
        />
      </section>
    </div>
  </main>
</template>

<script>
import VideoComponent from "@/components/VideoComponent.vue";
import MainTopicComponent from "@/components/MainTopicComponent.vue";
import KeyTagComponent from "@/components//KeyTagComponent.vue";
import TimeStampAndTitle from "@/components/TimeStampAndTitle.vue";
import StampNoteComponent from "@/components/StampNoteComponent.vue";

export default {
  name: "VideoDetail",
  components: {
    VideoComponent,
    MainTopicComponent,
    KeyTagComponent,
    TimeStampAndTitle,
    StampNoteComponent,
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
    this.video = data.filter((element) => element.id === this.$route.params.id);
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
  width: 5%;
}
.table-item__title {
  width: 25%;
}
.video-details {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 1rem;
}
.comments {
  grid-column-start: 2;
}
.timestamps-table-container {
  grid-area: 1 / 1 / 3 / 2;
}
</style>
