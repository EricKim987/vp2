<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue';
import BackButton from '@/components/BackButton.vue';
import { useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { getMealsByIngredient } from '@/api/TheMealDB';
import { computed } from 'vue';

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
      <div v-else
           class="meals-container">
        <router-link v-for="meal in data?.meals"
                     :key="meal.idMeal"
                     :to="`/recipe/${meal.idMeal}`"
                     class="meal">
          <img :src="`${meal.strMealThumb}/medium`"
               :alt="meal.strMeal"
               class="meal-image">
          <div class="meal-text">{{ meal.strMeal }}</div>
        </router-link>
      </div>
    </div>
  </main>
</template>

<style>
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

.meals-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  margin-top: 20px;

  .meal {
    box-shadow: 0 0 20px var(--color-box-shadow);
    text-decoration: none;
    padding-bottom: 10px;

    .meal-image {
      width: 100%;
      height: auto;

      &:hover {
        opacity: 0.9;
      }
    }

    .meal-text {
      padding: 5px 10px;
      forced-color-adjust: none;
      color: var(--color-text);
    }
  }
}
</style>