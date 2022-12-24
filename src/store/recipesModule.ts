import type { Store as VuexStore, DispatchOptions, CommitOptions } from 'vuex';

import type RecipeData from '@/types/interfaces/recipe.interface';
import type ModulesName from '@/types/modulesName';

interface Mutations {}

interface Actions {}

interface Getters {}

type NamespacedMutations = Namespaced<Mutations, ModulesName.RECIPES>;
type NamespacedGetters = Namespaced<Getters, ModulesName.RECIPES>;
type NamespacedActions = Namespaced<Actions, ModulesName.RECIPES>;

type Namespaced<T, N extends string> = {
	[P in keyof T & string as `${N}/${P}`]: T[P];
};

export interface RecipesState {
	allRecipes: RecipeData[];
}

export type Store<S = RecipesState> = Omit<
	VuexStore<S>,
	'getters' | 'commit' | 'dispatch'
> & {
	commit<
		S extends keyof NamespacedMutations,
		P extends Parameters<NamespacedMutations[S]>[1]
	>(
		key: S,
		payload: P,
		options?: CommitOptions
	): ReturnType<NamespacedMutations[S]>;
} & {
	getters: {
		[K in keyof NamespacedGetters]: ReturnType<NamespacedGetters[K]>;
	};
} & {
	dispatch<K extends keyof NamespacedActions>(
		key: K,
		payload?: Parameters<NamespacedActions[K]>[1],
		options?: DispatchOptions
	): ReturnType<NamespacedActions[K]>;
};

interface RecipesModule {
	state: () => RecipesState;
	getters: {};
	mutations: {};
	actions: {};
	namespaced: boolean;
}

const recipesModule: RecipesModule = {
	state: () => ({
		allRecipes: [],
	}),
	getters: {},
	mutations: {},
	actions: {},
	namespaced: true,
};

export default recipesModule;
