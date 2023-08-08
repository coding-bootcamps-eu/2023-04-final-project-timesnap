<!-- Contains title, text block, image and if necessary a button -->

<template>
  <article class="article-container">
    <section>
      <h2>{{ title }}</h2>
      <slot />
      <DefaultBtn
        v-if="btnText !== 'noBtn'"
        :btnText="btnText"
        @click="triggerRedirect"
      />
    </section>
    <img v-if="imgSrc !== undefined" :src="imgSrc" alt="" />
  </article>
</template>
<script>
import DefaultBtn from "@/components/DefaultBtn.vue";
export default {
  components: {
    DefaultBtn,
  },
  props: {
    title: {
      type: String,
      required: true,
      default: "please add a Title",
    },
    btnText: {
      type: String,
    },
    imgSrc: {
      type: String,
      required: true,
    },
  },
  methods: {
    triggerRedirect() {
      this.$emit("triggerRedirect");
    },
  },
};
</script>
<style scoped>
article {
  margin: 5rem auto;
  display: flex;
  gap: 2rem;
}
section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
img {
  border-radius: 2rem;
  width: 400px;
  height: fit-content;
  align-self: center;
}
.article-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.btn {
  margin-top: 1em;
}
</style>
