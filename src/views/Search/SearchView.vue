<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue';
import BackButton from '@/components/BackButton.vue';

</script>

<template>
  <BackButton />
  <main>
    <h2 class="title">Search Results {{ $route.query }}</h2>
    <SearchInput />
    <div class="recipes">

    </div>
  </main>
</template>