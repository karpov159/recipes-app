<template>
	<section class="main">
		<h1 class="main__title">Recipes App</h1>

		<div class="main__tools">
			<div class="main__search">
				<input
					@keyup.enter="getRecipes"
					v-model="state.searchQuery"
					class="main__input"
					placeholder="Search for recipes"
					type="text"
				/>

				<SearchIcon @click="getRecipes" />
			</div>

			<div class="main__filter">
				<FilterIcon @click="openFilters" />
			</div>
		</div>

		<RecipeList :recipes="recipes" />

		<ModalItem v-show="isFiltersOpened" :closeModal="closeFilters">
			<Filters />
		</ModalItem>

		<Spinner v-if="isLoading" />

		<div
			v-if="recipes.length > 0"
			v-intersection="loadMoreRecipes"
			ref="obs"
			class="observer"
		></div>
	</section>
</template>

<script setup lang="ts">
import FilterIcon from '@/components/Icons/FilterIcon.vue';
import SearchIcon from '@/components/Icons/SearchIcon.vue';
import RecipeList from '@/components/RecipeList.vue';
import Spinner from '@/components/Spinner.vue';
import ModalItem from '@/components/ModalItem.vue';
import Filters from '@/components/Filters.vue';
import { useStore } from '@/store';
import { computed, onMounted, reactive, ref } from 'vue';

interface MainPageState {
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

const state: MainPageState = reactive({
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
.main {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 30px;
	padding-bottom: 100px;
}

.main__tools {
	margin-top: 20px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.main__title {
	text-align: center;
	font-size: 34px;
	color: var(--main-color);
	cursor: default;
}

.main__input {
	padding: 20px 50px 20px 20px;
	font-size: 18px;
	width: 500px;
	height: 60px;
	border-radius: 10px;
	border: 2px solid var(--main-color);
}

.main__filter {
	margin-left: 10px;
	width: 60px;
	height: 60px;
	padding: 5px;
	border-radius: 10px;
	border: 2px solid var(--main-color);
}

.main__input:focus {
	outline: 1px solid var(--main-color);
}

.main__search {
	position: relative;
}
</style>
