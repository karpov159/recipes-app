import type {
	Store as VuexStore,
	DispatchOptions,
	CommitOptions,
	GetterTree,
	ActionTree,
	MutationTree,
} from 'vuex';
import axios from 'axios';

import type RecipeData from '@/types/interfaces/recipe.interface';
import type ModulesName from '@/types/modulesName';

interface ActionPayload {
	query: string;
	currentPage: number;
}

interface Mutations {
	setRecipes(state: RecipesState, recipes: RecipeData[]): void;
	changeCurrentPage(state: RecipesState, page: number): void;
	setLastSearchQuery(state: RecipesState, query: string): void;
}

interface Actions {
	fetchRecipes(
		context: AugmentedActionContext,
		payload: ActionPayload
	): Promise<ResponseApi>;
	getRecipes(context: AugmentedActionContext, payload: ActionPayload): void;
	loadMoreRecipes(context: AugmentedActionContext): void;
}

interface Getters {}

interface ResponseApi {
	number: number;
	offset: number;
	results: RecipeData[];
	totalResults: number;
}

type NamespacedMutations = Namespaced<Mutations, ModulesName.RECIPES>;
type NamespacedGetters = Namespaced<Getters, ModulesName.RECIPES>;
type NamespacedActions = Namespaced<Actions, ModulesName.RECIPES>;

type Namespaced<T, N extends string> = {
	[P in keyof T & string as `${N}/${P}`]: T[P];
};

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
	getters: GetterTree<RecipesState, RecipesState> & Getters;
	mutations: MutationTree<RecipesState> & Mutations;
	actions: ActionTree<RecipesState, RecipesState> & Actions;
	namespaced: boolean;
}

const recipesModule: RecipesModule = {
	state: () => ({
		allRecipes: [],
		currentPage: 1,
		lastSearchQuery: '',
	}),
	getters: {},
	mutations: {
		setRecipes(state, recipes) {
			state.allRecipes = recipes;
		},
		changeCurrentPage(state, page) {
			state.currentPage = page;
		},
		setLastSearchQuery(state, query) {
			state.lastSearchQuery = query;
		},
	},
	actions: {
		async fetchRecipes(context, { currentPage, query }) {
			try {
				const response = await axios.get(
					'https://api.spoonacular.com/recipes/complexSearch',
					{
						params: {
							apiKey: 'a0eb9f69a5b84518ac4032f20a005969',
							query,
							offset: currentPage * 18 - 18,
							number: 18,
						},
					}
				);

				const data = await response.data;

				return data;
			} catch (error) {
				throw error;
			}
		},
		getRecipes({ dispatch, commit }, payload) {
			commit('setLastSearchQuery', payload.query);

			dispatch('fetchRecipes', payload).then((res) => {
				commit('setRecipes', res.results);
			});
		},
		loadMoreRecipes({ dispatch, commit, state }) {
			commit('changeCurrentPage', state.currentPage + 1);

			dispatch('fetchRecipes', {
				query: state.lastSearchQuery,
				currentPage: state.currentPage,
			}).then((res) => {
				commit('setRecipes', [...state.allRecipes, ...res.results]);
			});
		},
	},
	namespaced: true,
};

export default recipesModule;
