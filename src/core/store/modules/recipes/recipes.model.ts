import type {
	Store as VuexStore,
	DispatchOptions,
	CommitOptions,
	GetterTree,
	ActionTree,
	MutationTree,
} from 'vuex';

import type { RecipeData, RecipeInfo } from '@/models';
import type { Namespaced, ResponseApi } from '../../store.model';
import type ModulesName from '@/constants/modules-name';

interface Mutations {
	setRecipes(state: RecipesState, recipes: RecipeData[]): void;
	changeCurrentPage(state: RecipesState, page: number): void;
	setLastSearchQuery(state: RecipesState, query: string): void;
	setLoading(state: RecipesState, bool: boolean): void;
	setFiltersOpened(state: RecipesState, bool: boolean): void;
	setFilterQuery(state: RecipesState, query: string): void;
	setBrowsedRecipe(state: RecipesState, recipe: RecipeInfo): void;
	setActiveTab(state: RecipesState, name: string): void;
}

interface Actions {
	fetchRecipes(
		context: AugmentedActionContext,
		query: string
	): Promise<ResponseApi<RecipeData>>;
	getRecipes(context: AugmentedActionContext, query: string): void;
	loadMoreRecipes(context: AugmentedActionContext): void;
	fetchRecipe(
		context: AugmentedActionContext,
		id: string
	): Promise<RecipeInfo>;
	setRecipe(context: AugmentedActionContext, id: string): void;
}

interface Getters {}

interface AugmentedActionContext {
	commit<K extends keyof Mutations>(
		key: K,
		payload: Parameters<Mutations[K]>[1]
	): ReturnType<Mutations[K]>;
	state: RecipesState;
	dispatch<K extends keyof Actions>(
		key: K,
		payload: Parameters<Actions[K]>[1],
		options?: DispatchOptions
	): ReturnType<Actions[K]>;
}

export interface RecipesState {
	allRecipes: RecipeData[];
	currentPage: number;
	lastSearchQuery: string;
	isLoading: boolean;
	isFiltersOpened: boolean;
	filterQuery: string;
	browsedRecipe: RecipeInfo;
	activeTab: string;
}

export type NamespacedMutations = Namespaced<Mutations, ModulesName.RECIPES>;
export type NamespacedGetters = Namespaced<Getters, ModulesName.RECIPES>;
export type NamespacedActions = Namespaced<Actions, ModulesName.RECIPES>;

export type Store<S> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
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

export interface RecipesModule {
	state: () => RecipesState;
	getters: GetterTree<RecipesState, RecipesState> & Getters;
	mutations: MutationTree<RecipesState> & Mutations;
	actions: ActionTree<RecipesState, RecipesState> & Actions;
	namespaced: boolean;
}
