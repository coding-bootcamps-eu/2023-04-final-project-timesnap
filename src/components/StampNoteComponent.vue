<template>
  <div class="table-item__table">
    <h4>{{ timeStart }}</h4>
    <h3>{{ stampTitle }}</h3>
    <p v-html="formattedText"></p>
  </div>
</template>
<script>
export default {
  props: {
    timeStart: undefined,
    stampTitle: String,
    stampNote: String,
  },
  computed: {
    formattedText() {
      return this.lineBreak(this.stampNote);
    },
  },
  methods: {
    lineBreak(text) {
      return text.replace(/\n/g, "<br>");
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

.table-item__table {
  padding: 2rem;
  border: 1px solid var(--color-accent-grey-80);
  border-radius: 2rem;
}
.stampTitle {
  font-weight: 600;
}
</style>
