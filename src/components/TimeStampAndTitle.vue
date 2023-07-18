<template>
  <tr>
    <td>
      <button class="timeAt" @click="timeStartData">{{ timeStart }}</button>
    </td>
    <td>{{ stampTitle }}</td>
  </tr>
</template>
<script>
export default {
  props: {
    timeStart: undefined,
    stampTitle: String,
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

.table-item__table tbody > tr > td + td {
  padding-top: 0.5em;
}

.table-item__table tbody > tr:first-child td {
  padding-top: 1em;
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
