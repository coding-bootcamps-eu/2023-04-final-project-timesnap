<template>
  <button class="btn">{{ btnText }}</button>
</template>
<script>
export default {
  props: {
    btnText: {
      type: String,
      required: true,
      default: "click here",
    },
  },
};
</script>

<style scoped>
.btn {
  border-radius: 2rem;
  padding: 0.75rem;
  border: 1px solid #d6dde6;
  background: none;
  cursor: pointer;
}

.btn--Primary {
  background: #2c3c54;
  color: #ffffff;
}

.btn--Secondary {
  background: #e2e6ee;
}
</style>
