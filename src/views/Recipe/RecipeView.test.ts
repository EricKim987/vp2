import RecipeView from "./RecipeView.vue";
import { screen } from "@testing-library/vue";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { getMealDetailsUrl, type MealDetailType } from "@/api/TheMealDB";
import { renderWithVueQueryRouter } from "@/utils/tests";
import userEvent from "@testing-library/user-event";

const mealDetail: { meals: MealDetailType[] } = {
	meals: [
		{
			idMeal: "123",
			strMeal: "Test Meal",
			strCategory: "Test Category",
			strArea: "Test Area",
			strInstructions: "Test instructions.",
			strMealThumb: "test-thumb.jpg",
			strTags: "tag1,tag2",
			strYoutube: "https://www.youtube.com/watch?v=abc123",
			// ...other fields...
			strIngredient1: "Chicken",
			strMeasure1: "1 kg",
			strIngredient2: "Salt",
			strMeasure2: "1 tsp",
			// Fill up to 20 for completeness
			...Object.fromEntries(
				Array.from({ length: 18 }, (_, i) => [`strIngredient${i + 3}`, ""]),
			),
			...Object.fromEntries(
				Array.from({ length: 18 }, (_, i) => [`strMeasure${i + 3}`, ""]),
			),
		} as MealDetailType,
	],
};

const mealDetailsHandler = http.get(getMealDetailsUrl, () => {
	return HttpResponse.json(mealDetail);
});
const youtubeHandler = http.get("https://www.youtube.com/*", () => {
	return HttpResponse.json({});
});

const server = setupServer(mealDetailsHandler, youtubeHandler);

const routes = [
	{ path: "/", name: "home", component: { template: "<div>Home</div>" } },
	{
		path: "/search",
		name: "search",
		component: { template: "<div>Search</div>" },
	},
	{ path: "/recipe/:mealId", name: "recipe", component: RecipeView },
];

describe("RecipeView", () => {
	beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
	afterAll(() => server.close());
	afterEach(() => server.resetHandlers());

	it("renders breadcrumb and recipe details", async () => {
		renderWithVueQueryRouter(RecipeView, routes);

		// Breadcrumb
		expect(await screen.findByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Search")).toBeInTheDocument();
		expect(screen.getByText("Recipe")).toBeInTheDocument();

		// Recipe title
		expect(await screen.findByText("Test Meal")).toBeInTheDocument();

		// Instructions
		expect(screen.getByText("Test instructions.")).toBeInTheDocument();
	});

	it("breadcrumb links navigate correctly", async () => {
		renderWithVueQueryRouter(RecipeView, routes);

		const homeLink = await screen.findByText("Home");
		const searchLink = screen.getByText("Search");
		const recipeText = screen.getByText("Recipe");

		expect(homeLink.closest("a")).toHaveAttribute("href", "/");
		expect(searchLink.closest("a")).toHaveAttribute("href", "/search");
		expect(recipeText.closest("a")).toBeNull();

		const user = userEvent.setup();
		user.click(searchLink);
		expect(await screen.findByText("Search")).toBeInTheDocument();
	});
});
