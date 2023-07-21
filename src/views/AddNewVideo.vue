<template>
  <main class="main">
    <h1>Add new Video</h1>
    <form @submit.prevent="addNewVideo">
      <section class="video-info">
        <fieldset>
          <label for="title">Video Title</label>
          <input
            class="input"
            type="text"
            name="title"
            id="title"
            placeholder="Please add a Video Title"
            size="30"
            minlength="3"
            required
            v-model="newVideo.title"
          />
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
            @blur="showThumbnail"
          />

          <figure>
            <img
              v-if="newVideo.videoUrl !== ''"
              :src="ThumbnailUrl"
              alt="Seems like your Link is wrong"
              width="400"
            />
          </figure>
        </fieldset>
        <fieldset>
          <label for="creator">Please type in your Name/Alias</label>
          <input
            class="input"
            id="creator"
            type="text"
            v-model="newVideo.creatorName"
          />
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
        </fieldset>
      </section>
      <!-- Keytags Section -->
      <fieldset class="keytag-section">
        <legend>
          Select the tags that best describes the content of your Video
        </legend>
        <section class="keytag-select">
          <div class="video-info--details-keytags">
            <KeyTagSelector
              v-for="(value, id) in searchVideos.keyTags"
              :key="id"
              :id="value.id"
              :tag="value.tag"
              :value="value.id"
              v-model="newVideo.keyTagId"
              required
            />
          </div>
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
      </fieldset>

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
main {
  width: 110ch;
  justify-content: inherit;
}
form {
  margin-top: 1em;
}

.video-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3em;
  margin-bottom: 2em;
}

.video-info input,
.video-info select {
  width: 100%;
  padding: 0.5em;
}

label {
  font-weight: bold;
  color: #333;
  margin: 1em 0 0.5em;
}

legend {
  font-weight: bold;
  color: #333;
  margin: 1em 0 1em;
}

figure {
  margin: 1em 0;
}

.input,
.keytag-select {
  background-color: #fff;
  color: #333;
  cursor: pointer;
  border: 1px solid #0080c0;
  border-radius: 5px;
}

.keytag-select {
  padding: 2em;
  color: #333;
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
.video-info--details-keytags {
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  grid-gap: 1em;
}

.add-tags {
  display: flex;
  gap: 1em;
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
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid #0080c0;
  border-radius: 5px;
  margin-right: 10px;
}
</style>
