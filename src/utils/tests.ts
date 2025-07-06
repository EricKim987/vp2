import { VueQueryPlugin } from "@tanstack/vue-query";
import { render } from "@testing-library/vue";
import type { Component } from "vue";
import {
	createRouter,
	createWebHistory,
	type RouteRecordRaw,
} from "vue-router";

export const renderWithVueQuery = (component: Component) => {
	const router = createRouter({
		history: createWebHistory(),
		routes: [],
	});
	return render(component, { global: { plugins: [VueQueryPlugin, router] } });
};
// Test components with real router
// https://test-utils.vuejs.org/guide/advanced/vue-router.html#Using-a-Real-Router
export const renderWithVueQueryRouter = (
	component: Component,
	routes: RouteRecordRaw[],
) => {
	const router = createRouter({
		history: createWebHistory(),
		routes,
	});
	render(component, { global: { plugins: [VueQueryPlugin, router] } });
};
