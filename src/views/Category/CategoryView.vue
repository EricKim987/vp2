<script setup lang="ts">
import { getMealsByCategory } from '@/api/TheMealDB';
import { useQuery } from '@tanstack/vue-query';
import BackButton from '@/components/BackButton.vue';
import MealGrid from '@/components/MealGrid.vue';

const { name } = defineProps<{
  name: string;
}>();

const { isPending, isError, data, error } = useQuery({
  queryKey: ['category', name],
  queryFn: () => getMealsByCategory(name)
})
</script>

<template>
  <BackButton />
  <div class="title">{{ name }} recipes</div>
  <div v-if="isPending">Loading...</div>
  <div v-else-if="isError">Error: {{ error?.message }}</div>
  <div v-else-if="!data?.meals || data.meals.length === 0">
    No results found. Please try a different search term.</div>
  <MealGrid v-else
            :meals="data.meals"
            imgSuffix="medium" />
</template>

<style scoped>
.back-button {
  padding: 5px 10px;
  font-size: 1.1em;
}

.title {
  text-transform: capitalize;
  margin: 20px auto 0;
  width: fit-content;
  font-size: 2rem;
}
</style>