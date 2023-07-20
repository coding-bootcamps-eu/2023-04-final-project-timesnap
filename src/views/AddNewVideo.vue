<template>
  <main>
    <h1>Add new Video</h1>
    <form @submit.prevent="addNewVideo">
      <div>
        <label for="creator">Please type in your Name/Alias</label>
        <input id="creator" type="text" v-model="newVideo.creatorName" />
      </div>
      <div>
        <label for="title"> Enter a Video Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Please add a Video Title"
          size="30"
          minlength="3"
          required
          v-model="newVideo.title"
        />
      </div>
      <section>
        <div>
          <label for="url"> Enter a YouTube Link: </label>
          <input
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
        </div>

        <img
          v-if="newVideo.videoUrl !== ''"
          :src="ThumbnailUrl"
          alt="Seems like your Link is wrong"
          width="200"
        />
      </section>

      <section class="video-info--details">
        <fieldset class="video-info--details-maintopic">
          <legend>Select 1 Main Topic:</legend>

          <select name="groupId" id="groupId" v-model="newVideo.groupId">
            <MainTopicSelector
              v-for="(value, id) in searchVideos.groups"
              :key="id"
              :id="value.id"
              :title="value.title"
            />
            <option>others</option>
          </select>
          <div v-if="newVideo.groupId === 'others'">
            <label for="newMainTopic">Type in a new Main Topic</label>
            <input
              type="text"
              id="newMainTopic"
              placeholder="Please be specific"
              size="30"
              minlength="3"
              v-model="newMainTopic.title"
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
              v-for="(value, id) in searchVideos.keyTags"
              :key="id"
              :id="value.id"
              :tag="value.tag"
              :value="value.id"
              v-model="newVideo.keyTagId"
              required
            />
          </div>
          <section>
            <div class="newkeytagselector">
              <input
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
                type="text"
                v-model="newKeyTag.tag"
                required
                placeholder="type in new Tag"
              />
              <input type="submit" value="Add Tag" />
            </form>
          </section>
        </fieldset>
      </section>
      <input id="submit" type="submit" @click="addNewVideo" />
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
      fetch(`${process.env.VUE_APP_API_URL}/videos`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(this.newVideo),
      });
      useSearchStore().getVideos();
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
      if (this.newVideo.videoUrl.length === 43) {
        const YouTubeID = this.newVideo.videoUrl
          .split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/)[2]
          .split(/[^0-9a-z_-]/i)[0];
        this.ThumbnailUrl = `https://i.ytimg.com/vi/${YouTubeID}/hq720.jpg`;
      } else {
        this.ThumbnailUrl = "";
      }
    },
  },
};
</script>
<style scoped>
form {
  margin-top: 1em;
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
  width: 60vw;
  padding-top: 1em;
}

.add-tags {
  display: flex;
  gap: 1em;
}

.add-tags input[type="submit"] {
  padding: 0.25em 1em;
}

.newkeytagselector {
  display: flex;
  gap: 0.25em;
  margin: 1em 0;
}
.keytagselector {
  display: flex;
  gap: 0.25em;
}

#submit {
  margin-top: 1em;
}
</style>
