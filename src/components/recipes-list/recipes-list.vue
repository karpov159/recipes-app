<template>
	<div class="recipes">
		<div class="recipes__tools">
			<div class="recipes__search">
				<input
					@keyup.enter="getRecipes"
					v-model="state.searchQuery"
					class="recipes__input"
					placeholder="Search for recipes"
					type="text"
				/>

				<search-icon @click="getRecipes" />
			</div>

			<div class="recipes__filter-icon">
				<filter-icon @click="openFilters" />
			</div>
		</div>

		<recipe-list :recipes="recipes" />

		<modal-item v-show="isFiltersOpened" :closeModal="closeFilters">
			<filters-menu />
		</modal-item>

		<spinner-item v-if="isLoading" />

		<div
			v-if="recipes.length > 0"
			v-intersection="loadMoreRecipes"
			ref="obs"
			class="observer"
		></div>
	</div>
</template>

<script setup lang="ts">
import FilterIcon from '@/components/Icons/FilterIcon.vue';
import SearchIcon from '@/components/Icons/SearchIcon.vue';
import RecipeList from '@/components/RecipeList.vue';
import SpinnerItem from '@/components/SpinnerItem.vue';
import ModalItem from '@/components/ModalItem.vue';
import FiltersMenu from '@/components/FiltersMenu.vue';
import { useStore } from '@/core/store';
import { computed, onMounted, reactive, ref } from 'vue';

interface RecipesPageState {
	searchQuery: string;
}

const store = useStore();

const obs = ref<HTMLDivElement | null>(null);

const recipes = computed(() => store.state.recipes.allRecipes);
const isLoading = computed(() => store.state.recipes.isLoading);
const isFiltersOpened = computed(() => store.state.recipes.isFiltersOpened);

const loadMoreRecipes = () => store.dispatch('recipes/loadMoreRecipes');
const setFiltersOpened = (bool: boolean) =>
	store.commit('recipes/setFiltersOpened', bool);

const state: RecipesPageState = reactive({
	searchQuery: '',
});

const getRecipes = () => {
	store.dispatch('recipes/getRecipes', state.searchQuery);
};

const openFilters = () => {
	setFiltersOpened(true);
};

const closeFilters = () => {
	setFiltersOpened(false);
};

onMounted(() => {
	getRecipes();
});
</script>

<style scoped>
.recipes {
	display: flex;
	flex-direction: column;
	padding: var(--component-paddings);
	background-color: var(--bg-color);
	width: 100%;
	height: 100%;
	overflow-y: auto;
}

.recipes__tools {
	display: flex;
	flex-direction: row;
}

.recipes__input {
	padding: 20px 50px 20px 20px;
	font-size: 18px;
	width: 730px;
	height: 60px;
	border-radius: 10px;
	border: 2px solid var(--main-color);
}

.recipes__filter-icon {
	width: 65px;
	height: 60px;
	padding: 5px;
	border-radius: 10px;
	border: 2px solid var(--main-color);
	position: relative;
	margin-left: 10px;
}

.recipes__input:focus {
	outline: 1px solid var(--main-color);
}

.recipes__search {
	position: relative;
}
</style>
