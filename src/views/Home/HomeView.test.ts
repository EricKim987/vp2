import HomeView from "./HomeView.vue";
import { screen } from "@testing-library/vue";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { getCategoriesUrl, type CategoriesType } from "@/api/TheMealDB";
import { renderWithVueQuery } from "@/utils/tests";

const categories: CategoriesType = {
	categories: [
		{
			idCategory: "1",
			strCategory: "test",
			strCategoryThumb: "test-img",
			strCategoryDescription: "test-description",
		},
	],
};

const categoriesHandler = http.get(getCategoriesUrl, () => {
	return HttpResponse.json(categories);
});

const server = setupServer(categoriesHandler);

describe("HomeView", () => {
	beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
	afterAll(() => server.close());
	afterEach(() => server.resetHandlers());
	it("renders title", () => {
		renderWithVueQuery(HomeView);
		const title = screen.getByText("Recipes");
		expect(title).toBeInTheDocument();
	});
});
