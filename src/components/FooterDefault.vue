<template>
  <footer class="footer">
    <div footer-content>
      <nav class="links">
        <p>&copy; 2023 TimeSnap.</p>
        <router-link :to="{ name: 'privacy' }">Privacy</router-link>
        <router-link :to="{ name: 'contact' }">Contact</router-link>

        <router-link class="nav-link" :to="{ name: 'about' }"
          >About</router-link
        >
      </nav>
    </div>
  </footer>
</template>
<style scoped>
.footer {
  padding: 20px;
}

.links {
  display: flex;
  gap: 2em;
  padding: 1em 2em;
  align-items: center;
}
p {
  width: fit-content;
  margin-right: 2em;
}
</style>
