<!-- Contains title, text block, image and if necessary a button -->

<template>
  <article class="article-container">
    <h2 class="article-title">{{ title }}</h2>
    <section class="articleText">
      <slot />
      <DefaultBtn
        v-if="btnText !== 'noBtn'"
        :btnText="btnText"
        @click="triggerRedirect"
        class="article-btn"
      />
    </section>
    <img v-if="imgSrc !== undefined" :src="imgSrc" alt="" class="articleImg" />
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
.articleText {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.article-container {
  width: 100%;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: space-between;
}
.article-container + .article-container {
  margin-top: 4rem;
}
.article-title {
  justify-content: start;
}

.articleImg {
  border-radius: 1.5rem;
  width: 100%;
  height: fit-content;
  align-self: center;
  grid-row: 2 / 3;
  border: 1px solid var(--color-accent-grey-80);
  justify-self: center;
  margin-block: 1rem;
}

.article-btn {
  margin-top: 1em;
  margin-inline: 0 auto;
}

h2 {
  order: -5;
}
/* MIN WIDTH 800PX */

@media (min-width: 800px) {
  .article-container {
    grid-template-rows: auto 1fr;
    column-gap: 2rem;
    row-gap: 1rem;
  }
  .articleImg {
    width: 400px;
    grid-row: 1 / 3;
    grid-column: 2;
    align-self: start;
    margin-block: 0;
  }

  p {
    color: green;
  }

  .article-btn {
    margin-top: 1em;
  }

  h2 {
    order: -5;
    margin-inline: 0;
  }
}
</style>
