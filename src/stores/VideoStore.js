import { defineStore } from "pinia";
export const useVideoStore = defineStore("videoStore", {
  state: () => ({
    groups: [],
    videos: [],
    keyTags: [],
    loading: false,
  }),
  actions: {
    async getVideos() {
      this.loading = true;
      const groupResponse = await fetch("http://localhost:3333/groups");
      const groupData = await groupResponse.json();

      const videoResponse = await fetch("http://localhost:3333/videos");
      const videoData = await videoResponse.json();

      const keyTagResponse = await fetch("http://localhost:3333/keyTags");
      const keyTagData = await keyTagResponse.json();

      this.groups = groupData;
      this.videos = videoData;
      this.keyTags = keyTagData;
      this.loading = false;
    },
  },
});
