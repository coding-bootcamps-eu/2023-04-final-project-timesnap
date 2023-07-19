<template>
  <main>
    <div class="about">
      <header>
        <h1>About this project</h1>
      </header>
      <article>
        This web application is part of the curriculum of the Web Developers
        Bootcamp by
        <a href="https://coding-bootcamps.eu">Coding Bootcamps Europe</a>.
        <br /><br />
        It is the final project of <br />
        Noah Wolters, Julia Stephan and Jimmy Ng - all participants of the full
        time class of April 2023 (duration: 3 month).
        <br />
        The main task is to display our gained knowledge over the time of the
        bootcamp. It focusses on the frontend programming skills including
        <br />

        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JS</li>
          <li>VUE CLI</li>
        </ul>

        As well as implementing a git workflow and E2E Testing with Cypress.
        <br />
        The backend infrastructure was provided by the tutor - Joe Ray Gregory
        respectively.
      </article>
    </div>
  </main>
</template>
<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin: 2em 3em;
}

.about {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

ul {
  margin: 1rem;
}
article {
  font-weight: 200;
  color: var(--color-buttons-primary);
  line-height: 1.5;
}
</style>
