import type { IngredientsData } from '@/models';

interface RecipeInfo {
	id: number;
	title: string;
	image: string;
	imageType: string;
	servings: number;
	readyInMinutes: number;
	aggregateLikes: number;
	healthScore: number;
	pricePerServing: number;
	cuisines: [];
	dishTypes: string[];
	summary: string;
	instructions: string;
	diets: string[];
	extendedIngredients: IngredientsData[];
}

export default RecipeInfo;
