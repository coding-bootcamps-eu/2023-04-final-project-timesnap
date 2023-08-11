<template>
  <p :class="{ addGap: filterdKeyTags.length > 1 }" class="keyTagComponent">
    <span
      v-for="(value, id) in filterdKeyTags"
      :key="id"
      @click="searchKeytag(value.tag)"
      class="clickable keytag"
      >#{{ value.tag }}</span
    >
  </p>
</template>

<script>
import { useSearchStore } from "@/stores/SearchStore";
export default {
  name: "KeyTag",
  emits: ["search-tag"],
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
  methods: {
    searchKeytag(tag) {
      this.$emit("search-tag", tag);
    },
  },
};
</script>

<style scoped>
.keyTagComponent {
  cursor: pointer;
}
.keytag {
  font-size: smaller;
  font-weight: 400;
}
</style>
