<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/" class="home-link">Go to Home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}
.not-found h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.not-found p {
  margin-bottom: 2rem;
}
.home-link {
  color: #3498db;
  text-decoration: underline;
  font-size: 1.2rem;
}
</style>