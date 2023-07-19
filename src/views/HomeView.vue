<template>
  <main>
    <h1>Home</h1>
    <article-large
      title="Set timestamps that matter"
      imgSrc="https://picsum.photos/300/200"
      btnText="noBtn"
    >
      <p>
        Welcome to TimeSnap. This platform allows you to set your individual
        timestamps on any video. This allows you to jump right to the content
        that matters to you. As a community based platform you can recommend
        your own timestamps to the public page.
      </p>
    </article-large>
    <article-large
      title="How to get started"
      imgSrc="https://picsum.photos/300/200?3=1"
      btnText="How to use"
    >
      <p>
        You don’t need an account to watch the videos provided by the community.
        Simply browse through the list of already edited videos.
        <br /><br /><span>Looking for a specific topic?</span> <br />Simply use
        the predefined filters to find the category that you are looking for or
        search for buzzwords to get to the topic that matters to you the most.
      </p>
    </article-large>
    <section>
      <h2>Newest Videos</h2>
      <section
        class="video-preview"
        v-for="video in searchVideos.latestVideos"
        :key="video.id"
      >
        <thumbnail-component
          :videoData="video"
          @video-data-id="videoDetailPage"
        />
      </section>
    </section>
  </main>
</template>
<script>
import { useSearchStore } from "@/stores/SearchStore";
import ArticleLarge from "@/components/ArticleLarge.vue";
import ThumbnailComponent from "@/components/ThumbnailComponent.vue";

export default {
  name: "HomeView",
  components: {
    ArticleLarge,
    ThumbnailComponent,
  },
  setup() {
    const searchVideos = useSearchStore();

    //fetch videos
    return { searchVideos };
  },
  methods: {
    typeSwitch(value) {
      if (value.includes("youtube")) {
        return "video/youtube";
      } else {
        return "video/mp4";
      }
    },
    youtubeGetID(url) {
      url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      return undefined !== url[2] ? url[2].split(/[^0-9a-z_-]/i)[0] : url[0];
    },
    videoDetailPage(id) {
      this.$router.push(`/videos/${id}`);
    },
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
