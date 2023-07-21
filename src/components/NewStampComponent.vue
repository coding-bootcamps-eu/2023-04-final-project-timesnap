<template>
  <form class="table-item__table" @submit.prevent="submitForm">
    <label class="left-span" for="stamp-title">Title</label>
    <input
      :value="stampTitle"
      @input="updateTitle($event.target.value)"
      type="text"
      id="stamp-title"
      required
      class="left-span input"
    />
    <label class="right-span" for="start-time">Time</label>
    <input type="text" id="start-time" :value="inputTime" disabled />

    <label class="left-span" for="stamp-note">Note</label>
    <textarea
      :value="stampNote"
      @input="updateNote($event.target.value)"
      id="stamp-note"
      cols="30"
      rows="8"
      required
      class="input"
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
  display: grid;
  grid-gap: 0.5em 2em;
  grid-template-columns: 1fr 1fr;
  padding: 2rem;
  border: 1px solid var(--color-accent-grey-80);
  border-radius: 2rem;
}
.stampTitle {
  font-weight: 600;
}
.right-span {
  grid-column: 3/3;
  grid-row: 1;
}
.left-span {
  grid-column: 1/2 span;
}
#start-time {
  background-color: #e1e1e1;
  border: none;
  border-radius: 0.25em;
  color: #575757;
  padding: 0.25em 1em;
  grid-column: 3/3;
  grid-row: 2;
}

#stamp-note {
  grid-column: 1/3 span;
}

.input {
  background-color: #fff;
  color: #333;
  cursor: pointer;
  border: 1px solid #0080c0;
  border-radius: 5px;
}

input[type="submit"] {
  margin: 1em 0;
  padding: 0.75em 0.5em;
  border-radius: 1em;
  background: var(--color-accent-blue-100);
  color: var(--color-bg);
  cursor: pointer;
  border: none;
}
</style>
