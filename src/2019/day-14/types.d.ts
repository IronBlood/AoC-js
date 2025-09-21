export interface Ingredient {
	name: string;
	count: number;
}

export interface Recipe {
	name: string;
	output: number;
	ingredients: Ingredient[];
}

export interface IngredientN {
	id: number;
	count: number;
}

export interface RecipeN {
	id: number;
	output: number;
	ingredients: IngredientN[];
}
