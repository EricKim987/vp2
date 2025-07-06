<script setup lang="ts">
import { defineProps } from 'vue';

const { meals } = defineProps<{
  meals: Array<{
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }>;
  imgSuffix?: 'small' | 'medium' | 'large';
}>();
</script>

<template>
  <div class="meals-container">
    <router-link v-for="meal in meals"
                 :key="meal.idMeal"
                 :to="`/recipe/${meal.idMeal}`"
                 class="meal">
      <img :src="imgSuffix ? `${meal.strMealThumb}/${imgSuffix}` : meal.strMealThumb"
           :alt="meal.strMeal"
           class="meal-image">
      <div class="meal-text">{{ meal.strMeal }}</div>
    </router-link>
  </div>
</template>

<style scoped>
.meals-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  margin-top: 20px;
}

.meal {
  box-shadow: 0 0 20px var(--color-box-shadow);
  text-decoration: none;
  padding-bottom: 10px;
}

.meal-image {
  width: 100%;
  height: auto;
}

.meal-image:hover {
  opacity: 0.9;
}

.meal-text {
  padding: 5px 10px;
  forced-color-adjust: none;
  color: var(--color-text);
}
</style>
<!-- Rename this file to MealGrid.vue -->
