<template>
  <div class="keytag-selector">
    <input type="checkbox" :id="id" :name="id" :value="value" v-model="model" />
    <label :for="id">{{ tag }}</label>
  </div>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  name: "KeyTagSelector",
  props: {
    tag: String,
    id: String,
    value: String,
    modelValue: Array,
  },
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style scoped>
.keytag-selector input[type="checkbox"] {
  width: 1em;
}
</style>
