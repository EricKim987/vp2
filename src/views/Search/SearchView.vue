<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue';
import BackButton from '@/components/BackButton.vue';
import { useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { getMealsByIngredient } from '@/api/TheMealDB';
import { computed } from 'vue';
import MealGrid from '@/components/MealGrid.vue';

const route = useRoute();

const query = computed(() => route.query.q as string)

const { isPending, isError, data, error } = useQuery({
  queryKey: ['search', query],
  queryFn: () => getMealsByIngredient(query.value),
  enabled: computed(() => Boolean(query.value))
});
</script>

<template>
  <BackButton />
  <main class="search-view">
    <h2 class="title">Search Results</h2>
    <SearchInput />
    <div class="meals">
      <div v-if="isPending">Loading...</div>
      <div v-else-if="isError">Error: {{ error?.message }}</div>
      <div v-else-if="!data?.meals || data.meals.length === 0">
        No results found for "{{ query }}". Please try a different search term.</div>
      <MealGrid v-else
                :meals="data.meals"
                imgSuffix="medium" />
    </div>
  </main>
</template>

<style scoped>
.search-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1800px;
}

.meals {
  align-self: stretch;
  margin-top: 20px;
}
</style>