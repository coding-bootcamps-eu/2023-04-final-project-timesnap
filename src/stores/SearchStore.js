import { defineStore } from "pinia";
export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    groups: [],
    videos: [],
    keyTags: [],
    currentSearch: "",
    groupFilter: "",
    tagFilter: "",
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
  getters: {
    searchResult(state) {
      const resultTags = state.keyTags.find((element) =>
        element.tag
          .toLocaleLowerCase()
          .includes(state.currentSearch.toLocaleLowerCase())
      );
      const resultGroups = state.groups.find((element) =>
        element.title
          .toLocaleLowerCase()
          .includes(state.currentSearch.toLocaleLowerCase())
      );
      const resultVideos = state.videos.find((element) =>
        element.title
          .toLocaleLowerCase()
          .includes(state.currentSearch.toLocaleLowerCase())
      );
      if (resultTags || resultVideos || resultGroups) {
        const result = new Set();

        if (resultTags) {
          const filteredTags = state.videos.filter((video) =>
            video.keyTagId.includes(resultTags.id)
          );
          filteredTags.forEach((video) => result.add(video));
        }

        if (resultVideos) {
          const filteredVideos = state.videos.filter((video) =>
            video.id.includes(resultVideos.id)
          );
          filteredVideos.forEach((video) => result.add(video));
        }

        if (resultGroups) {
          const filteredGroups = state.videos.filter((video) =>
            video.groupId.includes(resultGroups.id)
          );
          filteredGroups.forEach((video) => result.add(video));
        }
        return [...result].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      } else {
        return [];
      }
    },
    latestVideos(state) {
      const newVideos = state.videos;
      const filterdVideos = newVideos
        .sort((a, b) => {
          return Date.parse(b.createdAt) - Date.parse(a.createdAt);
        })
        .slice(0, 3);
      return filterdVideos;
    },
    filterResult(state) {
      const filteredVideos = state.videos.filter((video) => {
        const groupIds = video.groupId;
        const tagIds = video.keyTagId;
        const mainTopicFilter =
          state.groupFilter === "" ||
          groupIds.includes(state.groupFilter) ||
          video.id === state.groupFilter;

        const tagFilter =
          state.tagFilter === "" || tagIds.includes(state.tagFilter);

        return mainTopicFilter && tagFilter;
      });
      return filteredVideos;
    },
  },
});
