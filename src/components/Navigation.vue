<template>
  <header class="top-header">
    <figure class="timesnap-logo" @click="redirectHome">
      <img src="https://picsum.photos/50/50" alt="" />
      <h1>Timesnap</h1>
    </figure>
    <div class="search">
      <!-- Input noch ohne Funktion und focus styling -->
      <input type="search" name="" placeholder="Search" />
      <button type="submit" class="btn--search"></button>
    </div>
    <nav class="main-nav">
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link :to="{ name: 'videos' }">Videos</router-link>
      <router-link :to="{ name: 'faq' }">FAQ</router-link>
      <router-link :to="{ name: 'about' }">About</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavComp",
  methods: {
    redirectHome() {
      this.$router.push(`/`);
    },
  },
};
</script>

<style scoped>
.top-header {
  display: grid;
  grid-template-columns: 1fr 4fr 2fr;
  grid-gap: 2em;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: 2em 3em;
  margin-bottom: 2em;
  background: var(--color-buttons-primary);
  text-decoration: none;
}

img {
  border-radius: 50%;
  border: solid white 0.025em;
}

.timesnap-logo {
  display: flex;
  align-items: center;
  gap: 1em;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
}

.search {
  display: flex;
  position: relative;
  width: 100%;
  justify-content: flex-end;
}

input[type="search"] {
  position: relative;
  width: 80%;
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

.main-nav {
  display: flex;
  gap: 2em;
  margin-left: auto;
  color: white;
}

a {
  color: white;
}
</style>
