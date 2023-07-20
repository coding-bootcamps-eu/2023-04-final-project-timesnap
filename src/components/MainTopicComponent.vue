<template>
  <h3>Main Topic:</h3>
  <p :class="{ addGap: filterdTopics.length > 1 }">
    <span v-for="(value, id) in filterdTopics" :key="id"
      >{{ value.title }}
    </span>
  </p>
</template>

<script>
import { useSearchStore } from "@/stores/SearchStore";
export default {
  name: "MainTopic",
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const searchVideos = useSearchStore();

    //fetch videos
    return { searchVideos };
  },
  computed: {
    filterdTopics() {
      const filterIds = this.video.groupId;
      const filteredGroups = this.searchVideos.groups.filter((group) =>
        filterIds.includes(group.id)
      );
      return filteredGroups;
    },
  },
};
</script>

<style scoped>
.addGap span:first-child::after {
  content: ",";
}
</style>
