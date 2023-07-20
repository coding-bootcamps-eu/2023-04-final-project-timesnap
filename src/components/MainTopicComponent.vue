<template>
  <h3>Main Topic:</h3>
  <p :class="{ addGap: filterdTopics.length > 1 }">
    <span v-for="(value, id) in filterdTopics" :key="id"
      >{{ value.title }}
    </span>
  </p>
</template>

<script>
export default {
  name: "MainTopic",
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      groups: [],
    };
  },
  computed: {
    filterdTopics() {
      const filterIds = this.video.groupId;
      const filteredGroups = this.groups.filter((group) =>
        filterIds.includes(group.id)
      );
      return filteredGroups;
    },
  },
  async mounted() {
    const response = await fetch("http://localhost:3333/groups");
    const data = await response.json();
    this.groups = data;
  },
};
</script>

<style scoped>
.addGap span:first-child::after {
  content: ",";
}
</style>
