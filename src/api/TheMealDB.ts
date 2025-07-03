const base_url = "https://www.themealdb.com/api/json/v1/1";

export const getCategoriesUrl = `${base_url}/categories.php`;
export const getMealsByCategoryUrl = `${base_url}/filter.php`;

export type CategoryType = {
	idCategory: string;
	strCategory: string;
	strCategoryThumb: string;
	strCategoryDescription: string;
};

export type CategoriesType = {
	categories: CategoryType[];
};

export async function getCategories(): Promise<CategoriesType> {
	const response = await fetch(getCategoriesUrl);
	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}
	const data = await response.json();
	return data;
}

export type MealType = {
	strMeal: string;
	strMealThumb: string;
	idMeal: string;
};

export type MealsType = {
	meals: MealType[];
};

export async function getMealsByCategory(category: string): Promise<MealsType> {
	const response = await fetch(`${getMealsByCategoryUrl}?c=${category}`);
	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}
	const data = await response.json();
	return data;
}
