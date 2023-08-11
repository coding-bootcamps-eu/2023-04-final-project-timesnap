<template>
  <main class="main">
    <h1>Add new Video</h1>
    <form @submit.prevent="addNewVideo" class="new-video-inputfield">
      <article class="video-info--container">
        <section id="video-info-title">
          <label for="videoTitle">Video Title</label>
          <input
            class="input"
            type="text"
            name="title"
            id="videoTitle"
            placeholder="Please add a Video Title"
            size="30"
            minlength="3"
            required
            v-model="newVideo.title"
          />
        </section>
        <section class="video-info--yt-link">
          <label for="url">YouTube Link</label>
          <input
            class="input"
            type="url"
            name="url"
            id="url"
            placeholder="https://www.youtube.com/watch?v={VideoID}"
            pattern="https://www.youtube.com/.*"
            size="50"
            required
            v-model="newVideo.videoUrl"
            @change="showThumbnail"
          />
        </section>
        <section class="video-info--yt-thumbnail">
          <label v-if="newVideo.videoUrl !== ''" for="yt-thumbnail"
            >Preview</label
          >

          <img
            v-if="newVideo.videoUrl !== ''"
            :src="ThumbnailUrl"
            alt="Seems like your Link is wrong"
            id="yt-thumbnail"
          />
        </section>

        <section class="video-info--added-by">
          <label for="creator">Please type in your Name/Alias</label>
          <input
            class="input"
            id="creator"
            type="text"
            v-model="newVideo.creatorName"
          />
        </section>
        <section class="video-info--main-topic">
          <label for="groupId">Main Topic</label>
          <select
            class="dropdown"
            name="groupId"
            id="groupId"
            v-model="newVideo.groupId"
          >
            <MainTopicSelector
              v-for="(value, id) in searchVideos.groups"
              :key="id"
              :id="value.id"
              :title="value.title"
            />
            <option>others</option>
          </select>
        </section>
        <section id="new-main-topic">
          <template v-if="newVideo.groupId === 'others'">
            <label for="newMainTopic">Type in a new Main Topic</label>
            <input
              class="input"
              type="text"
              id="newMainTopic"
              placeholder="Please be specific"
              size="30"
              minlength="3"
              v-model="newMainTopic.title"
              required
            />
          </template>
        </section>
      </article>
      <!-- Keytags Section -->
      <article class="keytag-section">
        <legend>Keytags</legend>
        <section class="video-info--keytags">
          <h3>Select the tags that best describes the content of your Video</h3>
          <KeyTagSelector
            v-for="(value, id) in searchVideos.keyTags"
            :key="id"
            :id="value.id"
            :tag="value.tag"
            :value="value.id"
            v-model="newVideo.keyTagId"
            required
          />
        </section>
        <section class="new-key-tag-selector">
          <div class="new-tag-check">
            <input
              class="input"
              id="newKeyTag1"
              type="checkbox"
              v-model="showkeyTagInput"
            />
            <label for="newKeyTag1">Check to add new Tag</label>
          </div>
          <form
            v-if="showkeyTagInput"
            @submit.prevent="submitNewTag"
            class="add-tags"
          >
            <input
              class="input"
              type="text"
              v-model="newKeyTag.tag"
              required
              placeholder="type in new Tag"
            />
            <input type="submit" value="Add Tag" id="add-tag" />
          </form>
        </section>
      </article>

      <input
        class="input-submit"
        id="submit"
        type="submit"
        @click="addNewVideo"
      />
    </form>
  </main>
</template>

<script>
import MainTopicSelector from "@/components/MainTopicSelector.vue";
import KeyTagSelector from "@/components/KeyTagSelector.vue";
import { useSearchStore } from "@/stores/SearchStore";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "AddNewVideo",
  setup() {
    const searchVideos = useSearchStore();

    //fetch videos
    return { searchVideos };
  },
  data() {
    return {
      newVideo: {
        id: uuidv4(),
        groupId: "",
        title: "",
        videoUrl: "",
        createdAt: new Date().toISOString(),
        creatorName: "",
        keyTagId: [],
        timeStamps: [],
      },
      newKeyTag: {
        id: "",
        tag: "",
      },
      newMainTopic: {
        id: uuidv4(),
        title: "",
      },

      //Zeigt ein neues Inputfeld an, wenn Checkbox für neuer Eintrag ausgewält ist
      showkeyTagInput: false,

      // für das preview Bild
      showThumbnailClicked: false,
      ThumbnailUrl: "",
    };
  },
  components: {
    MainTopicSelector,
    KeyTagSelector,
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
    addNewVideo() {
      if (this.newVideo.creatorName === "") {
        this.newVideo.creatorName = "Anonymous";
      }
      const data = [this.newVideo];
      fetch(`${process.env.VUE_APP_API_URL}/videos`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(this.newVideo),
      });
      this.searchVideos.getVideos();
      this.searchVideos.detailPage = data;
      this.$router.push(`/videos/${this.newVideo.id}`);
    },
    getNewMainTopic() {
      if (this.newVideo.groupId === "others") {
        const newGroup = {
          id: this.newMainTopic.id,
          title: this.newMainTopic.title,
        };
        fetch(`${process.env.VUE_APP_API_URL}/groups`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newGroup),
        });
        return this.newMainTopic.id;
      } else {
        return this.newVideo.groupId;
      }
    },
    submitNewTag() {
      if (this.newKeyTag.tag !== "") {
        this.newKeyTag.id = uuidv4();
        this.newKeyTag.tag = this.formattedKeyTag(this.newKeyTag.tag);
        fetch(`${process.env.VUE_APP_API_URL}/keyTags`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(this.newKeyTag),
        });
      }
      this.newVideo.keyTagId.push(this.newKeyTag.id);
      useSearchStore().getVideos();
      this.newKeyTag.id = "";
      this.newKeyTag.tag = "";
    },
    showThumbnail() {
      this.showThumbnailClicked = !this.showThumbnailClicked;
      if (this.newVideo.videoUrl.length >= 43) {
        const YouTubeID = this.newVideo.videoUrl
          .split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/)[2]
          .split(/[^0-9a-z_-]/i)[0];
        this.ThumbnailUrl = `https://i.ytimg.com/vi/${YouTubeID}/hqdefault.jpg`;
      } else {
        this.ThumbnailUrl = "";
      }
    },
    formattedKeyTag(keytag) {
      const words = keytag.split(" ");

      // Join the words together and convert to camel case
      const formattedString = words
        .map((word, index) => {
          if (index === 0) {
            return word.toLowerCase();
          } else {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }
        })
        .join("");
      return formattedString;
    },
  },
};
</script>
<style scoped>
form {
  margin-top: 1em;
}

.video-info--container {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1em;
  margin-bottom: 2em;
  align-items: flex-start;
}

#videoTitle {
  border-radius: 3px;
  border: 1px solid black;
}

.video-info--yt-link {
  display: flex;
  flex-direction: column;
}

#yt-thumbnail {
  max-height: 100px;
  width: auto;
  margin-top: 1em;
}

.video-info--added-by {
  grid-row: 2;
}
.video-info--added-by input {
  border-radius: 3px;
  border: 1px solid black;
}

input {
  width: 100%;
  margin-top: 1em;
}
select {
  width: 100%;
  margin-top: 1em;
}

label {
  font-weight: bold;
  color: #333;
}

legend {
  font-weight: bold;
  color: #333;
  margin: 1em 0 1em;
}

figure {
  margin: 1em 0;
}

h3 {
  grid-column: 1/4;
  margin: 1em 0;
}
.video-info--details {
  display: flex;
  flex-direction: column;
  gap: 2em;
}
.video-info--details-maintopic {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.video-info--keytags {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1em;
  background-color: #fff;
  color: #333;
  border: 1px solid #0080c0;
  border-radius: 5px;
  padding: 1em;
}
h3 {
  margin-top: 0;
  grid-column: 1;
  font-size: smaller;
}
.add-tags {
  display: flex;
  gap: 1em;
}

.keytag-selector > input {
  cursor: pointer;
  border-radius: 50%;
}

.add-tags input[type="submit"] {
  padding: 0.25em 1em;
}

.add-tags input[type="text"] {
  padding: 0.5em;
}

.new-key-tag-selector {
  display: flex;
  gap: 2em;
  margin: 0 0 1.5em;
  align-content: center;
  align-items: center;
}

.new-key-tag-selector > input {
  padding: 1em;
  margin: 0 1em;
}

.new-key-tag-selector label {
  margin: 1.85em 0 0.5em;
}

.new-key-tag-selector > div input[type="checkbox"] {
  width: 1em;
  margin: 1.85em 0 0.5em;
}

.new-tag-check {
  display: flex;
  gap: 1em;
  align-content: center;
  margin-left: 0.5em;
}

.keytag-input {
  background-color: #fff;
  color: #0080c0;
  cursor: pointer;
  border: 1px solid #0080c0;
  border-radius: 5px;
  margin-right: 10px;
}
.keytag-selector {
  display: flex;
  gap: 1em;
}

#submit {
  margin-top: 1em;
  padding: 0.85em 1.5em;
  border-radius: 1em;
  background: var(--color-accent-blue-100);
  color: var(--color-bg);
  cursor: pointer;
  border: none;
}

#add-tag {
  padding: 0.25em 2em;
  border-radius: 1em;
  cursor: pointer;
  border: none;
}

.dropdown {
  background-color: #fff;
  color: #333;
  cursor: pointer;
  border: 1px solid #0080c0;
  border-radius: 5px;
  margin-right: 10px;
}
#submit {
  width: fit-content;
}
/* MIN WIDTH 800PX */
@media (min-width: 800px) {
  .video-info--keytags {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1em;
  }
  .video-info--container {
    grid-template-columns: 1fr 1fr;
  }
  .video-info--yt-link {
    grid-column: 1 /2;
    display: flex;
    flex-direction: column;
  }
  .video-info--yt-thumbnail {
    grid-column: 2/3;
  }
  #yt-thumbnail {
    max-height: 100px;
    width: auto;
    margin-top: 1em;
  }

  .video-info--added-by {
    grid-column: 2/3;
    grid-row: 1/2;
  }
  .video-info--added-by input {
    border-radius: 3px;
    border: 1px solid black;
  }
  .video-info--main-topic {
    grid-column: 1 / 2;
  }
  #new-main-topic {
    grid-column: 2/3;
  }
  h3 {
    grid-column: 1/4;
  }
}
</style>
