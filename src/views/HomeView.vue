<template>
  <main>
    <h1>Home</h1>
    <article-large
      title="Set timestamps that matter"
      :imgSrc="require('@/assets/media/timestamp-star.jpg')"
      btnText="noBtn"
    >
      <p>
        Welcome to TimeSnap. This platform allows you to set your individual
        timestamps on any video. This allows you to jump right to the content
        that matters to you. <br />
        As a community based platform you can recommend your own timestamps to
        the public page.
      </p>
    </article-large>

    <article-large
      title="How to get started"
      :imgSrc="require('@/assets/media/howtouse-click.jpg')"
      btnText="How to use"
      @triggerRedirect="handleRedirect()"
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
        class="thumbnail-component"
        v-for="video in searchVideos.latestVideos"
        :key="video.id"
      >
        <thumbnail-component
          :videoData="video"
          @video-data-id="videoDetailPage"
          :videoWidth="30"
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
    handleRedirect() {
      this.$router.push(`/faq`);
    },
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
main {
  max-width: 110ch;
}
span {
  font-weight: 400;
}
.btn {
  border: none;
}
</style>
