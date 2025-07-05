<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
  <h1>Search Results {{ $route.query }}</h1>
  <SearchInput />
</template>