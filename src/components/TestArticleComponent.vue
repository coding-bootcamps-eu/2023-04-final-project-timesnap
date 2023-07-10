<template>
  <div>
    <h3>Title: {{ bla.title }}</h3>
    <br />
    <h3>URL: {{ bla.videoUrl }}</h3>
    <h4>Tags:</h4>
    <test-tag-list :timeStamps="bla.timeStamps" />
  </div>
</template>

<script>
import TestTagList from "./TestTagList.vue";
export default {
  components: { TestTagList },
  props: ["bla"],
  data() {
    return {};
  },
};
</script>

<style scoped></style>
