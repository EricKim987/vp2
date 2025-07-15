<script setup lang="ts">
import { useRecipes } from '@/stores/recipes';
import { computed } from 'vue';


const { meals } = defineProps<{
  meals: Array<{
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }>;
  imgSuffix?: 'small' | 'medium' | 'large';
}>();

const { saved, saveRecipe, deleteRecipe } = useRecipes();

const saveBtnHandler = (idMeal: string) => {
  if (!saved.includes(idMeal)) {
    saveRecipe(idMeal);
  } else {
    deleteRecipe(idMeal);
  }
};
</script>

<template>
  <div class="meals-container">
    <div v-for="meal in meals"
         :key="meal.idMeal"
         :to="`/recipe/${meal.idMeal}`"
         class="meal">
      <img :src="imgSuffix ? `${meal.strMealThumb}/${imgSuffix}` : meal.strMealThumb"
           :alt="meal.strMeal"
           class="meal-image">
      <div class="meal-info">
        <router-link class="meal-text"
                     :to="`/recipe/${meal.idMeal}`">{{ meal.strMeal }}</router-link>
        <button class="meal-save-btn"
                @click="saveBtnHandler(meal.idMeal)">
          <svg aria-hidden="true"
               class="save-btn-icon"
               xmlns="http://www.w3.org/2000/svg"
               width="13"
               height="17.3"
               viewBox="0 0 13 17.3">
            <path :fill="saved.includes(meal.idMeal) ? 'var(--color-text-hover)' : 'currentColor'"
                  stroke="var(--color-text)"
                  d="M12.5,16.5l-6-2.8l-6,2.8v-16h12V16.5z"></path>
          </svg>
          <span>Save</span></button>
      </div>
    </div>
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
  display: flex;
  flex-direction: column;

}

.meal-image {
  width: 100%;
  height: auto;
}

.meal-image:hover {
  opacity: 0.9;
}

.meal-info {
  flex: 1;
  display: flex;
  padding: 10px 10px 12px 10px;
  gap: 10px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.meal-text {
  forced-color-adjust: none;
  color: var(--color-text);
  text-decoration: none;

  &:hover {
    color: var(--color-text-hover);
  }
}

.meal-save-btn {
  padding: 5px 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;

  &:hover {
    .save-btn-icon {
      color: var(--color-text);
      transition: color 0.3s ease;
    }
  }
}

.save-btn-icon {
  color: transparent;
}
</style>
<!-- Rename this file to MealGrid.vue -->
