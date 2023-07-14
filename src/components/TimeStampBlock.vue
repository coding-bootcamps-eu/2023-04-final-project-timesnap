<template>
  <tr>
    <td>
      <button class="timeAt" @click="timeStartData">{{ timeStart }}s</button>
    </td>
    <td>{{ stampTitle }}</td>
    <td>{{ stampNote }}</td>
  </tr>
</template>
<script>
export default {
  name: "TimeStampBlock",
  props: {
    timeStart: Number,
    stampTitle: String,
    stampNote: String,
  },
  methods: {
    timeStartData() {
      this.$emit("timeStartData", this.timeStart);
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
  border-radius: rem;
}
.stampTitle {
  font-weight: 600;
}
</style>
