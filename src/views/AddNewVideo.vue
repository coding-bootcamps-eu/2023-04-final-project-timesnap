<template>
  <main class="main">
    <h1>Add new Video</h1>
    <form @submit.prevent="addNewVideo">
      <div>
        <label for="creator">Please type in your Name/Alias:</label>
        <input class="input" id="creator" type="text" v-model="creatorName" />
      </div>
      <div>
        <label for="title"> Enter a Video Title: </label>
        <input
          class="input"
          type="text"
          name="title"
          id="title"
          placeholder="Please add a Video Title"
          size="30"
          minlength="3"
          required
          v-model="newTitle"
        />
      </div>
      <section>
        <div>
          <label for="url"> Enter a YouTube Link: </label>
          <input
            class="input"
            type="url"
            name="url"
            id="url"
            placeholder="https://www.youtube.com/watch?v={VideoID}"
            pattern="https://www.youtube.com/.*"
            size="50"
            required
            v-model="url"
            @blur="showThumbnail"
          />
        </div>

        <img
          v-if="url !== ''"
          :src="ThumbnailUrl"
          alt="Seems like your Link is wrong"
          width="200"
        />
      </section>

      <section class="video-info--details">
        <fieldset class="video-info--details-maintopic">
          <legend>Select 1 Main Topic:</legend>

          <select
            class="dropdown"
            name="groupId"
            id="groupId"
            v-model="mainTopic"
          >
            <option value="">Alle</option>
            <MainTopicSelector
              v-for="(value, id) in groups"
              :key="id"
              :id="value.id"
              :title="value.title"
            />
            <option>others</option>
          </select>
          <div v-if="mainTopic === 'others'">
            <label for="newMainTopic">Type in a new Main Topic</label>
            <input
              type="text"
              id="newMainTopic"
              placeholder="Please be specific"
              size="30"
              minlength="3"
              v-model="newMainTopic"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>
            Select the tags that best describes the content of your Video:
          </legend>
          <div class="video-info--details-keytags">
            <KeyTagSelector
              v-for="(value, id) in keyTags"
              :key="id"
              :id="value.id"
              :tag="value.tag"
              :value="value.id"
              v-model="selectedKeyTags"
              required
            />
          </div>
          <section class="newkeytags">
            <div>
              <div class="newkeytagselector">
                <input
                  id="newKeyTag1"
                  type="checkbox"
                  v-model="showNewKeyTag1Input"
                />
                <label for="newKeyTag1">Check to add new Tag</label>
              </div>
              <div v-if="showNewKeyTag1Input">
                <input
                  class="keytag-input"
                  type="text"
                  v-model="newKeyTag1"
                  required
                  placeholder="type in new Tag"
                />
              </div>
            </div>
            <div>
              <div v-if="showNewKeyTag1Input" class="newkeytagselector">
                <input
                  class="keytag-input"
                  id="newKeyTag1"
                  type="checkbox"
                  v-model="showNewKeyTag2Input"
                />
                <label for="newKeyTag1">Check to add a 2nd new Tag</label>
              </div>
              <div v-if="showNewKeyTag2Input">
                <input
                  class="keytag-input"
                  type="text"
                  v-model="newKeyTag2"
                  required
                  placeholder="type in new Tag"
                />
              </div>
            </div>
            <div>
              <div v-if="showNewKeyTag2Input" class="newkeytagselector">
                <input
                  class="keytag-input"
                  id="newKeyTag1"
                  type="checkbox"
                  v-model="showNewKeyTag3Input"
                />
                <label for="newKeyTag1">Check to add a 3rd new Tag</label>
              </div>
              <div v-if="showNewKeyTag3Input">
                <input
                  class="keytag-input"
                  type="text"
                  v-model="newKeyTag3"
                  required
                  placeholder="type in new Tag"
                />
              </div>
            </div>
          </section>
        </fieldset>
      </section>
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
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      //Bestehende MainTopic und keyTag Daten aus der API
      groups: [],
      keyTags: [],

      //Daten vom neuen Video
      id: uuidv4(),
      url: "",
      newTitle: "",
      mainTopic: "",
      newMainTopicId: uuidv4(),
      newMainTopic: "",
      selectedKeyTags: [],
      newKeyTag1Id: uuidv4(),
      newKeyTag1: "",
      newKeyTag2Id: uuidv4(),
      newKeyTag2: "",
      newKeyTag3Id: uuidv4(),
      newKeyTag3: "",
      createdAt: this.getCurrentTime(),
      creatorName: "",

      //Zeigt ein neues Inputfeld an, wenn Checkbox für neuer Eintrag ausgewält ist
      showkeyTagInput: false,
      showNewKeyTag1Input: false,
      showNewKeyTag2Input: false,
      showNewKeyTag3Input: false,

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
      const newVideo = {
        id: this.id,
        groupId: this.getNewMainTopic(),
        title: this.newTitle,
        videoUrl: this.url,
        createdAt: this.createdAt,
        creatorName: this.getCreatorName(),
        keyTagId: this.getKeyTags(),
        timeStamps: [],
      };
      fetch("http://localhost:3333/videos", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newVideo),
      });
      this.$router.push(`/videos/${this.id}`);
    },

    getCurrentTime() {
      return new Date().toISOString();
    },
    getNewMainTopic() {
      if (this.mainTopic === "others") {
        const newGroup = { id: this.newMainTopicId, title: this.newMainTopic };
        fetch("http://localhost:3333/groups", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newGroup),
        });
        return this.newMainTopicId;
      } else {
        return this.mainTopic;
      }
    },
    getKeyTags() {
      const newKeyTag1 = { id: this.newKeyTag1Id, tag: this.newKeyTag1 };
      const newKeyTag2 = { id: this.newKeyTag2Id, tag: this.newKeyTag2 };
      const newKeyTag3 = { id: this.newKeyTag3Id, tag: this.newKeyTag3 };
      const newKeyTags = [];
      if (this.showNewKeyTag3Input) {
        newKeyTags.push(newKeyTag1, newKeyTag2, newKeyTag3);
        this.selectedKeyTags.push(
          this.newKeyTag1Id,
          this.newKeyTag2Id,
          this.newKeyTag3Id
        );
        newKeyTags.forEach((keyTag) => {
          fetch("http://localhost:3333/keyTags", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(keyTag),
          });
        });
        return this.selectedKeyTags;
      } else if (this.showNewKeyTag2Input) {
        newKeyTags.push(newKeyTag1, newKeyTag2);
        this.selectedKeyTags.push(this.newKeyTag1Id, this.newKeyTag2Id);
        newKeyTags.forEach((keyTag) => {
          fetch("http://localhost:3333/keyTags", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(keyTag),
          });
        });
        return this.selectedKeyTags;
      } else if (this.showNewKeyTag1Input) {
        newKeyTags.push(newKeyTag1);
        this.selectedKeyTags.push(this.newKeyTag1Id);
        newKeyTags.forEach((keyTag) => {
          fetch("http://localhost:3333/keyTags", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(keyTag),
          });
        });
        return this.selectedKeyTags;
      } else {
        return this.selectedKeyTags;
      }
    },
    getCreatorName() {
      if (this.creatorName !== "") {
        return this.creatorName;
      } else {
        return "Anonymous";
      }
    },
    showThumbnail() {
      this.showThumbnailClicked = !this.showThumbnailClicked;
      if (this.url.length === 43) {
        const YouTubeID = this.url
          .split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/)[2]
          .split(/[^0-9a-z_-]/i)[0];
        this.ThumbnailUrl = `https://i.ytimg.com/vi/${YouTubeID}/sddefault.jpg`;
      } else {
        this.ThumbnailUrl = "";
      }
    },
  },
  async mounted() {
    const responseGroups = await fetch("http://localhost:3333/groups");
    const responseKeyTags = await fetch("http://localhost:3333/keyTags");
    const groupData = await responseGroups.json();
    console.log(groupData);
    this.groups = groupData;
    const keyTagData = await responseKeyTags.json();
    console.log(keyTagData);
    this.keyTags = keyTagData;
  },
};
</script>
<style scoped>
form {
  margin-top: 1em;
}
label {
  margin-bottom: 0.5rem;
  margin-top: 1em;
  margin-right: 8px;
  font-weight: bold;
  color: #333;
}
legend {
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  margin-right: 8px;
  font-weight: bold;
  color: #333;
}

.input {
  background-color: #fff;
  color: #0080c0;
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid #0080c0;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  margin-right: 10px;
  width: 400px;
}

.video-info {
  display: flex;
  gap: 2em;
  margin: 2em 0;
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
  width: 20em;
}
.video-info--details-keytags {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.newkeytags {
  display: flex;
  gap: 2em;
}

.newkeytagselector {
  display: flex;
  gap: 0.25em;
  margin: 1em 0;
}
.keytag-input {
  background-color: #fff;
  color: #0080c0;
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid #0080c0;
  border-radius: 5px;
  margin-right: 10px;
}
.keytagselector {
  display: flex;
  gap: 0.25em;
}

#submit {
  margin-top: 1em;
  background-color: #fff;
  color: #0080c0;
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid #0080c0;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  margin-right: 10px;
}
.dropdown {
  background-color: #fff;
  color: #0080c0;
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid #0080c0;
  border-radius: 5px;
  margin-right: 10px;
}
</style>
