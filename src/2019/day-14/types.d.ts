export interface Ingredient {
	name: string;
	count: number;
}

export interface Recipe {
	name: string;
	output: number;
	ingredients: Ingredient[];
}
