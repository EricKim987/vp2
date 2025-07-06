<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { getMealDetails, type MealDetailType } from "@/api/TheMealDB";
import { computed } from "vue";

const route = useRoute();
const mealId = route.params.mealId as string;

const { data, isLoading, isError, error } = useQuery({
  queryKey: ["mealDetails", mealId],
  queryFn: () => getMealDetails(mealId),
});

const recipe = computed(() => data.value?.meals?.[0] ?? null);


function getIngredients(recipe: MealDetailType | null) {
  if (!recipe) return [];
  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof MealDetailType];
    const measure = recipe[`strMeasure${i}` as keyof MealDetailType];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient as string,
        measure: (measure as string) || "",
      });
    }
  }
  return ingredients;
}
</script>

<template>
  <nav class="breadcrumb">
    <router-link to="/">Home</router-link>
    <span>&gt;</span>
    <router-link to="/search">Search</router-link>
    <span>&gt;</span>
    <span>Recipe</span>
  </nav>
  <main class="recipe-view">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">
      <p>Failed to load recipe: {{ error?.message }}</p>
    </div>
    <div v-else-if="recipe">
      <h1 class="recipe-name">{{ recipe.strMeal }}</h1>
      <img :src="recipe.strMealThumb"
           :alt="recipe.strMeal"
           class="recipe-image" />
      <p><strong>Category:</strong> {{ recipe.strCategory }}</p>
      <p><strong>Area:</strong> {{ recipe.strArea }}</p>
      <p v-if="recipe.strTags"><strong>Tags:</strong> {{ recipe.strTags }}</p>
      <p v-if="recipe.strYoutube">
        <iframe :src="recipe.strYoutube.replace('watch?v=', 'embed/')"
                class="recipe-video"
                frameborder="0"
                allowfullscreen></iframe>
      </p>
      <h2>Ingredients</h2>
      <ul class="ingredients-list">
        <li v-for="(item, idx) in getIngredients(recipe)"
            :key="idx">
          {{ item.ingredient }} <span v-if="item.measure">- {{ item.measure }}</span>
        </li>
      </ul>
      <h2>Instructions</h2>
      <p class="instructions">{{ recipe.strInstructions }}</p>
    </div>
    <div v-else>
      <p>Recipe not found.</p>
    </div>
  </main>
</template>

<style>
.recipe-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  .recipe-name {
    margin: 0 auto;
    max-width: 80%;
    text-align: center;
    margin-bottom: 20px;
  }

  .recipe-image {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }

  .recipe-video {
    width: 100%;
    height: 400px;
    margin-bottom: 20px;
  }

  .ingredients-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    list-style: none;
    padding: 20px 0;
  }

  .instructions {
    white-space: pre-line;
  }
}

.breadcrumb {
  margin: 20px 0 10px 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.breadcrumb a {
  color: #3498db;
  text-decoration: none;
}

.breadcrumb span {
  color: #888;
}
</style>