<template>
  <form class="table-item__table" @submit.prevent="submitForm">
    <label for="start-time">Time</label>
    <input type="text" id="start-time" :value="inputTime" disabled />

    <label for="stamp-title">Title</label>
    <input
      :value="stampTitle"
      @input="updateTitle($event.target.value)"
      type="text"
      id="stamp-title"
      required
    />

    <label for="stamp-note">Note</label>
    <textarea
      :value="stampNote"
      @input="updateNote($event.target.value)"
      id="stamp-note"
      cols="30"
      rows="10"
      required
    ></textarea>

    <input type="submit" value="Submit" />
  </form>
</template>

<script>
export default {
  name: "NewStampComponent",
  emits: ["update-note", "update-title", "submit-form"],
  props: {
    inputTime: undefined,
    stampTitle: String,
    stampNote: String,
  },
  methods: {
    updateNote(value) {
      this.$emit("update-note", value);
    },
    updateTitle(value) {
      this.$emit("update-title", value);
    },
    submitForm() {
      this.$emit("submit-form");
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
