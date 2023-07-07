<template>
  <button class="btn">{{ btnText }}</button>
</template>
<script>
export default {
  props: {
    btnText: {
      type: String,
      default: "See more",
    },
  },
};
</script>

<style scoped>
.btn {
  color: var(--color-accent-blue-100);
  width: 150px;
  border-radius: 2rem;
  padding: 0.5rem;
  border: 1px solid var(--color-accent-blue-80);
  background: none;
  cursor: pointer;
  font-family: sans-serif;
}
.btn:hover {
  outline: 2px solid var(--color-accent-blue-100);
}

.btn:active {
  transform: scale(0.9);
}

.btn--primary {
  background: var(--color-buttons-primary);
  color: var(--color-secondary);
}

.btn--secondary {
  background: var(--color-buttons-secondary);
  color: var(--color-text);
}
</style>
