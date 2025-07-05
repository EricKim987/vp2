<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <button class="back-button"
          @click="router.push('/')">
    Back
  </button>
</template>

<style scoped>
.back-button {
  padding: 5px 10px;
  font-size: 1.1em;
}
</style>
