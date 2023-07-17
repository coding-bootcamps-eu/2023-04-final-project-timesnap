<template>
  <label :for="id">{{ tag }}</label>
  <input type="checkbox" :id="id" :name="id" :value="value" v-model="model" />
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
