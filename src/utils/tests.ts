import { VueQueryPlugin } from "@tanstack/vue-query";
import { render } from "@testing-library/vue";
import type { Component } from "vue";

export const renderWithVueQuery = (component: Component) =>
	render(component, { global: { plugins: [VueQueryPlugin] } });
