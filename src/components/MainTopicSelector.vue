<template>
  <option :value="id">{{ title }}</option>
</template>

<script>
export default {
  props: {
    id: String,
    title: String,
  },
};
</script>
