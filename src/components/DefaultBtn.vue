<template>
  <button class="btn">{{ btnText }}</button>
</template>
<script>
export default {
  props: {
    btnText: {
      type: String,
      required: true,
      default: "See more",
    },
  },
};
</script>

<style scoped>
@import "@/assets/btnStyle.css";
</style>
