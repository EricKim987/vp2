<script setup lang="ts">
import { getMealsByCategory } from '@/api/TheMealDB';
import { useQuery } from '@tanstack/vue-query';
import BackButton from '@/components/BackButton.vue';

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
  <div v-else
       class="meals-container">
    <router-link v-for="meal in data?.meals"
                 :key="meal.idMeal"
                 :to="`/meal/${meal.idMeal}`"
                 class="meal">
      <img :src="meal.strMealThumb"
           :alt="meal.strMeal"
           class="meal-image">
      <div class="meal-text">{{ meal.strMeal }}</div>
    </router-link>
  </div>
</template>

<style>
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