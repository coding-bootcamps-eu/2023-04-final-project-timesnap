<template>
  <main class="video-details" v-for="(value, id) in video" :key="id">
    <section class="time-stamp__wrapper time-stamp__flex">
      <table class="table-item__table">
        <thead>
          <tr>
            <th class="table-item__timeStamp">Timestamp</th>
            <th class="table-item__title">Title</th>
          </tr>
        </thead>
        <tbody>
          <TimeStampAndTitle
            v-for="(value, id) in value.timeStamps"
            v-bind:key="id"
            :timeStart="secondsToMin(value.timeStart)"
            :stampTitle="value.stampTitle"
            :stampNote="value.stampNote"
            @timeStartData="handleTimeStart"
          />
        </tbody>
      </table>
      <DefaultBtn
        class="time-stamp__btn"
        btnText="add Timestamp"
        @click="handleTime"
      />
    </section>

    <section>
      <VideoComponent
        :videoUrl="value.videoUrl"
        :videoType="typeSwitch(value.videoUrl)"
        :youtubeVideoId="youtubeGetID(value.videoUrl)"
        :timeStamp="timeStart"
        :getTime="getTime"
        @currentTime="currentTimeData"
        :videoWidth="50"
      />
      <article>
        <h2>{{ value.title }}</h2>

        <MainTopicComponent :video="value" />

        <KeyTagComponent :video="value" />
        <template v-for="(comment, id) in showComment()" v-bind:key="id">
          <StampNoteComponent
            v-if="showTimeStamp"
            :timeStart="secondsToMin(comment.timeStart)"
            :stampTitle="comment.stampTitle"
            :stampNote="comment.stampNote"
            class="comments"
          />
        </template>
        <NewStampComponent
          v-if="showAddStamp"
          :inputTime="secondsToMin(currentTime)"
          :stampTitle="newTimeStamp.stampTitle"
          @update-title="updateStampTitle"
          :stampNote="newTimeStamp.stampNote"
          @update-note="updateStampNotes"
          @submit-form="addTimeStamp"
        />
      </article>
    </section>
  </main>
</template>

<script>
import VideoComponent from "@/components/VideoComponent.vue";
import MainTopicComponent from "@/components/MainTopicComponent.vue";
import KeyTagComponent from "@/components//KeyTagComponent.vue";
import TimeStampAndTitle from "@/components/TimeStampAndTitle.vue";
import StampNoteComponent from "@/components/StampNoteComponent.vue";
import NewStampComponent from "@/components/NewStampComponent.vue";
import DefaultBtn from "@/components/DefaultBtn.vue";

export default {
  name: "VideoDetail",
  components: {
    VideoComponent,
    MainTopicComponent,
    KeyTagComponent,
    TimeStampAndTitle,
    StampNoteComponent,
    NewStampComponent,
    DefaultBtn,
  },
  data() {
    return {
      video: [],
      timeStart: null,
      currentTime: null,
      getTime: false,
      showTimeStamp: false,
      showAddStamp: false,
      newTimeStamp: {
        stampTitle: "",
        stampNote: "",
      },
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
      this.timeStart = this.minToSeconds(data);
      this.getTime = false;
      this.showTimeStamp = true;
      this.showAddStamp = false;
    },
    showComment() {
      if (this.timeStart !== null) {
        return this.video[0].timeStamps.filter(
          (comment) => comment.timeStart === this.timeStart
        );
      } else {
        return [];
      }
    },
    currentTimeData(data) {
      this.currentTime = data;
      this.getTime = false;
      this.checkForDuplicate();
    },
    checkForDuplicate() {
      const timeCheck = this.video[0].timeStamps.filter(
        (time) => time.timeStart === this.currentTime
      ).length;
      if (timeCheck > 0) {
        this.showTimeStamp = true;
        this.showAddStamp = false;
      } else if (timeCheck === 0) {
        this.showTimeStamp = false;
        this.showAddStamp = true;
      }
    },
    handleTime() {
      this.getTime = true;
    },
    secondsToMin(value) {
      const timeInMin = Math.abs(value / 60);
      const minuts = Math.floor(timeInMin);
      const seconds = Math.floor((timeInMin - minuts) * 60);
      if (seconds.toString().length === 1) {
        return `${minuts}:0${seconds}`;
      } else {
        return `${minuts}:${seconds}`;
      }
    },
    minToSeconds(value) {
      let timeInSeconds = value.split(":");
      timeInSeconds = timeInSeconds.reduce(
        (p, c) => Math.abs(p * 60) + Math.abs(c * 1)
      );
      return timeInSeconds;
    },
    updateStampTitle(value) {
      this.newTimeStamp.stampTitle = value;
    },
    updateStampNotes(value) {
      this.newTimeStamp.stampNote = value;
    },
    sortData(value) {
      const sortedData = value.map((item) => {
        const sortedTimeStamps = item.timeStamps.sort(
          (a, b) => a.timeStart - b.timeStart
        );
        return { ...item, timeStamps: sortedTimeStamps };
      });
      return sortedData;
    },
    async addTimeStamp() {
      const response = await fetch(
        `http://localhost:3333/videos/${this.video[0].id}`
      );
      const data = await response.json();

      const newTimeStampData = {
        timeStart: this.currentTime,
        stampTitle: this.newTimeStamp.stampTitle,
        stampNote: this.newTimeStamp.stampNote,
      };
      data.timeStamps.push(newTimeStampData);

      await fetch(`http://localhost:3333/videos/${this.video[0].id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      this.fetchVideoData();

      this.timeStart = this.currentTime;
      this.newTimeStamp.stampTitle = "";
      this.newTimeStamp.stampNote = "";

      this.showComment();
      this.showTimeStamp = true;
      this.showAddStamp = false;
    },
    async fetchVideoData() {
      const response = await fetch("http://localhost:3333/videos");
      const data = await response.json();
      const sortedData = this.sortData(data);
      this.video = sortedData.filter(
        (element) => element.id === this.$route.params.id
      );
    },
  },
  async mounted() {
    this.fetchVideoData();
  },
};
</script>

<style scoped>
.video-details {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 0 4em;
  margin: 3em 4em;
}

.time-stamp__wrapper {
  padding: 2rem;
  border: 1px solid var(--color-accent-grey-80);
  border-radius: 1rem;
}

.time-stamp__flex {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2em;
}

.time-stamp__btn {
  width: auto;
  padding: 1em 0.5em;
  border-radius: 1em;
  background: var(--color-accent-blue-100);
  color: var(--color-bg);
}

.table-item__table * {
  text-align: left;
}

.table-item__table thead {
  padding-bottom: 1em;
}

.table-item__table tr > th:first-child {
  padding-right: 1em;
}

.table-item__timeStamp {
  width: 5%;
}

.table-item__title {
  width: 25%;
}

.comments {
  grid-column-start: 2;
}
</style>
