<template>
  <footer class="footer">
    <div footer-content>
      <nav class="links">
        <p>&copy; 2023 TimeSnap.</p>
        <router-link :to="{ name: 'Imprint' }">Imprint</router-link>
        <router-link :to="{ name: 'Privacy' }">Privacy</router-link>
        <router-link :to="{ name: 'Contact' }">Contact</router-link>
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
