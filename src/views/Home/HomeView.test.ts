import HomeView from "./HomeView.vue";
import { render, screen } from "@testing-library/vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { getCategoriesUrl, type CategoriesType } from "@/api/TheMealDB";

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
		render(HomeView, { global: { plugins: [VueQueryPlugin] } });
		const title = screen.getByText("Recipes");
		expect(title).toBeInTheDocument();
	});
});
