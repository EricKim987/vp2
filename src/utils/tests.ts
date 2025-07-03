import { VueQueryPlugin } from "@tanstack/vue-query";
import { render } from "@testing-library/vue";
import type { Component } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router";

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
});

export const renderWithVueQuery = (component: Component) =>
	render(component, { global: { plugins: [VueQueryPlugin, router] } });
