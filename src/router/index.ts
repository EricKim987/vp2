import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home/HomeView.vue";
import CategoryView from "@/views/Category/CategoryView.vue";
import SearchView from "@/views/Search/SearchView.vue";
import RecipeView from "@/views/Recipe/RecipeView.vue";
import NotFound from "@/views/NotFound/NotFoundView.vue";

export const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/category/:name",
		name: "category",
		component: CategoryView,
		props: true,
	},
	{
		path: "/search",
		name: "search",
		component: SearchView,
	},
	{
		path: "/recipe/:mealId",
		name: "recipe",
		component: RecipeView,
	},
	{ path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
