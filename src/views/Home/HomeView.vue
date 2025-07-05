<script setup lang="ts">
import { getCategories } from '@/api/TheMealDB';
import { useQuery } from '@tanstack/vue-query';
import { RouterLink } from 'vue-router';
import SearchInput from '@/components/SearchInput.vue';

const { isPending, isError, data, error } = useQuery({
  queryKey: ['categories'],
  queryFn: getCategories
})
</script>

<template>
  <main>
    <h1 class="title">Recipes</h1>
    <SearchInput />
    <div class="categories">
      <span v-if="isPending">Loading...</span>
      <span v-else-if="isError">Error:{{ error?.message }}</span>
      <div v-else
           class="category-container">
        <RouterLink v-for="category in data?.categories"
                    :key="category.idCategory"
                    :to="`/category/${category.strCategory}`"
                    class="category">
          <img :src="category.strCategoryThumb"
               :alt="category.strCategory">
          <div class="category-text">{{ category.strCategory }}</div>
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1800px;
}

.title {
  margin-top: 30px;
  font-size: 2.5rem;
  font-weight: 600;
}

.categories {
  align-self: stretch;
  margin-top: 50px;
}

.category-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 30px;
}

.category {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 5px 0;
  text-decoration: none;
  color: var(--color-text);

  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
  }

  .category-text {
    margin-top: 5px;
  }

  &:hover {
    .category-text {
      color: var(--color-text-hover);
    }
  }

}
</style>
