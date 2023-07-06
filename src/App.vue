<template>
  <Navigation />

  <router-view />
  <article-large
    title="Set timestamps that matter"
    imgSrc="https://picsum.photos/300/200"
  >
    <p>
      Welcome to TimeSnap. This platform allows you to set your individual
      timestamps on any video. This allows you to jump right to the content that
      matters to you. As a community based platform you can recommend your own
      timestamps to the public page.
    </p>
  </article-large>
  <article-large
    title="How to get started"
    imgSrc="https://picsum.photos/300/200?3=1"
    btnText="Find out more"
  >
    <p>
      You don’t need an account to watch the videos provided by the community.
      Simply browse through the list of already edited videos.
      <br /><br /><span>Looking for a specific topic?</span> <br />Simply use
      the predefined filters to find the category that you are looking for or
      search for buzzwords to get to the topic that matters to you the most.
    </p>
  </article-large>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import ArticleLarge from "./components/ArticleLarge.vue";

export default {
  components: {
    Navigation,
    ArticleLarge,
  },
};
</script>

<style scoped>
p {
  font-weight: 200;
  color: var(--color-buttons-primary);
  line-height: 1.5;
}
span {
  font-weight: 400;
}
</style>
