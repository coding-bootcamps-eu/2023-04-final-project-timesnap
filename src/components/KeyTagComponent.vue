<template>
  <p :class="{ addGap: filterdKeyTags.length > 1 }" class="keyTagComponent">
    <span v-for="(value, id) in filterdKeyTags" :key="id"
      >#{{ value.tag }}</span
    >
  </p>
</template>

<script>
import { useSearchStore } from "@/stores/SearchStore";
export default {
  name: "KeyTag",
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
    filterdKeyTags() {
      const filterIds = this.video.keyTagId;
      const filteredTags = this.searchVideos.keyTags.filter((tag) =>
        filterIds.includes(tag.id)
      );
      return filteredTags;
    },
  },
};
</script>
