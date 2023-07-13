<template>
  <article
    class="timeStampsContainer"
    v-for="{ id, timeStamps } in videoData"
    :key="id"
  >
    <div v-for="(value, id) in timeStamps" v-bind:key="id">
      <button class="timeAt">{{ value.timeStart }}s</button>
      <p>
        <span class="stampTitle">{{ value.stampTitle }}</span>
        {{ value.stampNote }}
      </p>
    </div>
  </article>
</template>
<script>
export default {
  props: {
    videoData: {
      type: Object,
      required: true,
    },
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
  border-radius: 3rem;
}
.stampTitle {
  font-weight: 600;
}
</style>
