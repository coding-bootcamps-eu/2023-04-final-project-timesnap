<!-- Contains title, text block, image and if necessary a button -->

<template>
  <article>
    <section>
      <h2 class>{{ title }}</h2>
      <slot />
      <DefaultBtn v-if="btnText !== 'noBtn'" :btnText="btnText" />
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
};
</script>
<style scoped>
article {
  width: 80vmax;
  margin: 5rem auto;
  display: flex;
  gap: 2rem;
}
section {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
img {
  border-radius: 2rem;
}
h2 {
  color: var(--color-buttons-primary);
}
</style>
