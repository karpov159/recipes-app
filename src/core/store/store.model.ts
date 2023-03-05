import type {
	RecipesState,
	Store as RecipesStore,
} from './modules/recipes/recipes.model';

export type State = {
	recipes: RecipesState;
};

export type Store = RecipesStore<Pick<State, 'recipes'>>;

export type Namespaced<T, N extends string> = {
	[P in keyof T & string as `${N}/${P}`]: T[P];
};

export interface ResponseApi<T> {
	number: number;
	offset: number;
	results: T[];
	totalResults: number;
}
