<template>
  <header class="top-header">
    <img
      src="https://picsum.photos/50/50"
      alt=""
      id="logo-img"
      @click="redirectHome"
    />

    <h1 id="logo-title" @click="redirectHome">Timesnap</h1>

    <form class="search" @submit.prevent="searchResult">
      <!-- Input noch ohne Funktion und focus styling -->
      <input type="search" v-model="searchInput" placeholder="Search" />
      <button type="submit" class="btn--search"></button>
    </form>

    <nav class="main-nav">
      <router-link class="nav-link" :to="{ name: 'videos' }"
        >Videos</router-link
      >
      <router-link class="nav-link" :to="{ name: 'faq' }">FAQ</router-link>
    </nav>
  </header>
</template>

<script>
import { useSearchStore } from "@/stores/SearchStore";
export default {
  name: "NavComp",
  data() {
    return {
      searchInput: "",
    };
  },
  setup() {
    const searchVideos = useSearchStore();

    //fetch videos
    return { searchVideos };
  },
  methods: {
    searchResult() {
      useSearchStore().currentSearch = this.searchInput;
      this.$router.push({
        path: "/search-result",
        query: { search: this.searchInput },
      });
      this.searchInput = "";
    },
    redirectHome() {
      this.$router.push(`/`);
    },
  },
};
</script>

<style scoped>
.top-header {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  flex-wrap: wrap;
  grid-gap: 1em;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  padding: 2em 2em;
  margin-bottom: 2em;
  background: var(--color-buttons-primary);
  text-decoration: none;
  position: sticky;
  top: 0;
  z-index: 100;
}

img {
  border-radius: 50%;
  border: solid white 0.025em;
}

.timesnap-logo {
  grid-column: 1 / 3;
  display: flex;
  align-items: center;
  gap: 1em;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
}

#logo-img {
  grid-column: 1 /2;
  cursor: pointer;
}
#logo-title {
  grid-column: 2 /4;
  cursor: pointer;
}
.search {
  grid-column: 1/4;
  display: flex;
  position: relative;
  justify-content: flex-start;
  width: 240px;
}

input[type="search"] {
  position: relative;
  width: 100%;

  min-width: 20ch;
  border-radius: 0.25rem;
  border: none;
  padding: 0.25rem 1rem;
  z-index: 5;
}

.btn--search {
  position: absolute;
  cursor: pointer;
  height: 100%;
  width: 3em;
  padding: 0.25rem 1rem;
  top: 0;
  right: 0;
  border: none;
  background: transparent
    url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 27.7.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 31.6 30.6' style='enable-background:new 0 0 31.6 30.6;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:none;stroke:%23000000;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;%7D%0A%3C/style%3E%3Cg id='Icon_feather-search' transform='translate(-3 -3)'%3E%3Cpath id='Pfad_1' class='st0' d='M29.5,16.9c0,6.6-5.4,12-12,12s-12-5.4-12-12s5.4-12,12-12S29.5,10.3,29.5,16.9z'/%3E%3Cpath id='Pfad_2' class='st0' d='M32.5,31.9L26,25.4'/%3E%3C/g%3E%3C/svg%3E")
    no-repeat 1em center;
  background-size: 1rem;
  opacity: 0.5;
  z-index: 8;
}

/*.btn-icon {
  cursor: pointer;
  height: 100%;
  padding: 0.5em;
  border: none;
  background: transparent
    url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 27.7.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='-1 -2 35 35' style='enable-background:new 0 0 31.6 30.6;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:none;stroke:%23ffffff;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;%7D%0A%3C/style%3E%3Cg id='Icon_feather-search' transform='translate(-3 -3)'%3E%3Cpath id='Pfad_1' class='st0' d='M29.5,16.9c0,6.6-5.4,12-12,12s-12-5.4-12-12s5.4-12,12-12S29.5,10.3,29.5,16.9z'/%3E%3Cpath id='Pfad_2' class='st0' d='M32.5,31.9L26,25.4'/%3E%3C/g%3E%3C/svg%3E")
    no-repeat center;
  background-size: 1rem;
  opacity: 1;
  z-index: 8;
}
*/

.main-nav {
  grid-column: 1 / 4;
  display: flex;
  column-gap: 1em;
  row-gap: 0.5em;
  margin-left: 0;
  color: white;
}

.main-nav .nav-link:hover {
  color: #ad7b8f;
  border-radius: 5px;
}
a {
  color: white;
}
h1 {
  color: white;
}

/* MIN WIDTH 800 PX */
@media (min-width: 800px) {
  #logo-title {
    grid-column: 2 /3;
    display: block;
    justify-self: start;
  }
  .search {
    grid-column: 3/4;
    display: flex;
    position: relative;
    justify-self: center;
  }
  .main-nav {
    grid-column: 4/5;
    justify-self: end;
  }
  .btn-icon {
    display: none;
  }
}
</style>
