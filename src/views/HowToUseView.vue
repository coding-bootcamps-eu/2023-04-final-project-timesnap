<template>
  <main>
    <div class="how-to-use">
      <h1>FAQ</h1>
    </div>
    <article-large
      title="How to get started"
      imgSrc="https://picsum.photos/300/200?3=1"
      btnText="noBtn"
    >
      <p>
        To watch a video you simply click on any video preview picture in the
        Home page or Videos page. <br />
        The video will load and you can watch it within the list view. <br />
        Awesome!
        <br /><br />By clicking on a video's title you can jump to a detailed
        view with access to timestamps and comments.
      </p>
    </article-large>
    <article-large
      title="Using the search bar"
      imgSrc="https://picsum.photos/300/200?3=2"
      btnText="noBtn"
    >
      <p>
        You need a specific video, but don't want to browse through all the
        videos?
        <br />
        Simply type in the topic you are looking for. The search results will be
        displayed as a list.
      </p>
    </article-large>
    <article-large
      title="Add a new video"
      imgSrc="https://picsum.photos/300/200?3=3"
      btnText="Add New Video"
    >
      <p>
        Still not found what you've been looking for? <br />
        Well, why not add a new video to the database and help this page to grow
        and be more useful. <br />
        Once you are redirected to the input mask add all the necessary inputs
        that helps you and others within the community to find the video. <br />
        Give it a try and hit the button below.
      </p>
    </article-large>
    <article-large
      title="How do I use the time stamps?"
      imgSrc="https://picsum.photos/300/200?3=5"
      btnText="noBtn"
    >
      <p>
        On any video's details view you will have a column with timestamps left
        to the video. By clicking on the timestamp the video will jump to the
        time accordingly and gives you information about the passage in the
        video or the timestamp's authors thoughts on they put it there.
      </p>
    </article-large>
    <article-large
      title="Your own timestamps make the community better"
      imgSrc="https://picsum.photos/300/200?3=4"
      btnText="noBtn"
    >
      <p>
        You are missing a timestamp and feel like it should be included? <br />
        Within the video's details view click the "add timestamp button"
        whenever you want to add a timestamp. An input mask will appear waiting
        for you to fill in all the relevant information to make this video even
        more useful.
        <br />
        Oh, btw: the new timestamp will be sorted automatically within the
        timestamp overview, how cool is that?
      </p>
    </article-large>
  </main>
</template>

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
