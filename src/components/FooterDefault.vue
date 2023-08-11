<template>
  <footer class="footer">
    <p>&copy; 2023 TimeSnap</p>
    <nav class="links">
      <router-link :to="{ name: 'privacy' }">Privacy</router-link>
      <router-link :to="{ name: 'contact' }">Contact</router-link>

      <router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
    </nav>
  </footer>
</template>
<style scoped>
.footer {
  display: flex;
  flex-direction: row;
  margin-inline: 2em;
  margin-block: 1em;
  column-gap: 2em;
  row-gap: 0.5rem;
  flex-wrap: wrap;
}

.links {
  display: flex;
  column-gap: 2em;
  row-gap: 0.5rem;
  align-items: center;
  justify-items: center;
}
</style>
