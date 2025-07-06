const base_url = "https://www.themealdb.com/api/json/v1/1";

export const getCategoriesUrl = `${base_url}/categories.php`;
export const getMealsByCategoryUrl = `${base_url}/filter.php`;
export const getMealDetailsUrl = `${base_url}/lookup.php`;

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

export async function getMealsByIngredient(
	ingredient: string,
): Promise<MealsType> {
	const response = await fetch(`${getMealsByCategoryUrl}?i=${ingredient}`);
	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}
	const data = await response.json();
	return data;
}

export type MealDetailType = {
	idMeal: string;
	strMeal: string;
	strMealThumb: string;
	strCategory: string;
	strArea: string;
	strInstructions: string;
	strTags: string | null;
	strYoutube: string | null;
	strIngredient1?: string | null;
	strIngredient2?: string | null;
	strIngredient3?: string | null;
	strIngredient4?: string | null;
	strIngredient5?: string | null;
	strIngredient6?: string | null;
	strIngredient7?: string | null;
	strIngredient8?: string | null;
	strIngredient9?: string | null;
	strIngredient10?: string | null;
	strIngredient11?: string | null;
	strIngredient12?: string | null;
	strIngredient13?: string | null;
	strIngredient14?: string | null;
	strIngredient15?: string | null;
	strIngredient16?: string | null;
	strIngredient17?: string | null;
	strIngredient18?: string | null;
	strIngredient19?: string | null;
	strIngredient20?: string | null;
	strMeasure1?: string | null;
	strMeasure2?: string | null;
	strMeasure3?: string | null;
	strMeasure4?: string | null;
	strMeasure5?: string | null;
	strMeasure6?: string | null;
	strMeasure7?: string | null;
	strMeasure8?: string | null;
	strMeasure9?: string | null;
	strMeasure10?: string | null;
	strMeasure11?: string | null;
	strMeasure12?: string | null;
	strMeasure13?: string | null;
	strMeasure14?: string | null;
	strMeasure15?: string | null;
	strMeasure16?: string | null;
	strMeasure17?: string | null;
	strMeasure18?: string | null;
	strMeasure19?: string | null;
	strMeasure20?: string | null;
};

export type MealDetailsType = {
	meals: MealDetailType[];
};

export async function getMealDetails(mealId: string): Promise<MealDetailsType> {
	const response = await fetch(`${getMealDetailsUrl}?i=${mealId}`);
	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}
	const data = await response.json();
	return data;
}
