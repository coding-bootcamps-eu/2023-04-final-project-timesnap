<template>
  {{ stampNote }}
</template>
<script>
export default {
  props: {
    stampNote: String,
  },
};
</script>
<style scoped>
.timeAt {
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
}
div {
  margin: 2rem;
  display: flex;
  gap: 2rem;
}

h3 {
  margin-left: 5rem;
}
.timeStampsContainer {
  margin: 2rem;
  width: 80vmax;
  border: 2px solid var(--color-accent-grey-80);
  border-radius: rem;
}
.stampTitle {
  font-weight: 600;
}
</style>
