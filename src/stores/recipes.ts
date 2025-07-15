import { defineStore } from "pinia";
import { ref } from "vue";

export const useRecipes = defineStore("recipes", {
	state: () => ({
		saved: [] as string[],
	}),
	actions: {
		saveRecipe(id: string) {
			this.saved.push(id);
		},
		deleteRecipe(id: string) {
			const index = this.saved.indexOf(id);
			if (index < 0) {
				return;
			}
			this.saved.splice(index, 1);
		},
	},
	persist: true,
});
