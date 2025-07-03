import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home/HomeView.vue";
import CategoryView from "@/views/Category/CategoryView.vue";

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
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
