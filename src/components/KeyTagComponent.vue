<template>
  <h4>Tags:</h4>
  <p :class="{ addGap: filterdKeyTags.length > 1 }">
    <span v-for="(value, id) in filterdKeyTags" :key="id"
      >#{{ value.tag }}</span
    >
  </p>
</template>

<script>
export default {
  name: "KeyTag",
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      keyTags: [],
    };
  },
  computed: {
    filterdKeyTags() {
      const filterIds = this.video.keyTagId;
      const filteredTags = this.keyTags.filter((tag) =>
        filterIds.includes(tag.id)
      );
      return filteredTags;
    },
  },
  async mounted() {
    const response = await fetch("http://localhost:3333/keyTags");
    const data = await response.json();
    this.keyTags = data;
  },
};
</script>
