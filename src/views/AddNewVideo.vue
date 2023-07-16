<template>
  <h1>Add new Video</h1>
  <form action="">
    <div>
      <label for="url"> Enter a YouTube Link: </label>
      <input
        type="url"
        name="url"
        id="url"
        placeholder="https://www.youtube.com/watch?v={VideoID}"
        pattern="https://.*"
        size="50"
        required
      />
    </div>
    <VideoComponent />

    <div>
      <label for="title"> Enter a Video Title: </label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Please add a Video Title"
        size="40"
        minlength="3"
        required
      />
    </div>
    <fieldset>
      <legend>Main Topic (Pick up to 3):</legend>

      <select name="groupId" id="groupId" multiple>
        <MainTopicSelector
          v-for="(value, id) in groups"
          :key="id"
          :id="value.id"
          :title="value.title"
        />
        <option value="others" id="others">others</option>
      </select>
    </fieldset>
    <div>
      <label>
        <input type="checkbox" v-model="showInput" />
        Add new Main Topic
      </label>
      <input
        type="text"
        name="newGroupId"
        v-if="showInput"
        placeholder="Input Field"
      />
    </div>
    <input type="submit" />
  </form>
</template>

<script>
import VideoComponent from "@/components/VideoComponent.vue";
import MainTopicSelector from "@/components/addNewVideoFormComponents/MainTopicSelector.vue";

export default {
  data() {
    return {
      groups: [],
      keyTags: [],
      showInput: false,
    };
  },
  components: {
    VideoComponent,
    MainTopicSelector,
  },
  methods: {},
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

<style lang="scss" scoped></style>
