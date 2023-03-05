import axios from 'axios';

import type { RecipeInfo } from '@/models';
import type { RecipesModule } from './recipes.model';

import { API_KEY, PATHS, BASE_URL } from '@/constants/api-info';

const recipesModule: RecipesModule = {
	state: () => ({
		allRecipes: [],
		currentPage: 1,
		lastSearchQuery: '',
		isLoading: false,
		isFiltersOpened: false,
		filterQuery: '',
		browsedRecipe: {} as RecipeInfo,
		activeTab: 'Recipes',
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
		setLoading(state, bool) {
			state.isLoading = bool;
		},
		setFiltersOpened(state, bool) {
			state.isFiltersOpened = bool;
		},
		setFilterQuery(state, query) {
			state.filterQuery = query;
		},
		setBrowsedRecipe(state, recipe) {
			state.browsedRecipe = recipe;
		},
		setActiveTab(state, name) {
			state.activeTab = name;
		},
	},
	actions: {
		async fetchRecipes({ state }, query) {
			try {
				const response = await axios.get(PATHS.complexSearch, {
					params: {
						apiKey: API_KEY,
						query,
						offset: state.currentPage * 18 - 18,
						number: 18,
						cuisine: state.filterQuery,
					},
				});

				const data = await response.data;

				return data;
			} catch (error) {
				throw error;
			}
		},
		async getRecipes({ dispatch, commit }, query) {
			commit('changeCurrentPage', 1);

			commit('setLastSearchQuery', query);

			commit('setLoading', true);

			commit('setRecipes', []);

			dispatch('fetchRecipes', query).then((res) => {
				commit('setRecipes', res.results);

				commit('setLoading', false);
			});
		},
		async loadMoreRecipes({ dispatch, commit, state }) {
			commit('changeCurrentPage', state.currentPage + 1);

			commit('setLoading', true);

			dispatch('fetchRecipes', state.lastSearchQuery).then((res) => {
				commit('setRecipes', [...state.allRecipes, ...res.results]);

				commit('setLoading', false);
			});
		},
		async fetchRecipe({ commit }, id) {
			try {
				const response = await axios.get(
					`${BASE_URL}/recipes/${id}/information`,
					{
						params: {
							apiKey: API_KEY,
						},
					}
				);

				const data = await response.data;

				return data;
			} catch (error) {
				throw error;
			}
		},
		async setRecipe({ dispatch, commit }, id) {
			dispatch('fetchRecipe', id).then((res) => {
				commit('setBrowsedRecipe', res);
			});
		},
	},
	namespaced: true,
};

export default recipesModule;
