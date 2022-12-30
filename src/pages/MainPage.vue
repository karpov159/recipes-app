<template>
	<div class="main">
		<h1 class="main__title">Recipes App</h1>

		<div class="main__search">
			<input
				@keyup.enter="submit"
				v-model="state.searchQuery"
				class="main__input"
				placeholder="Search for recipes"
				type="text"
			/>

			<SearchIcon @click="submit" />
		</div>

		<RecipeList :recipes="recipes" />

		<Spinner v-if="isLoading" />

		<div
			v-if="recipes.length > 0"
			v-intersection="loadMoreRecipes"
			ref="obs"
			class="observer"
		></div>
	</div>
</template>

<script setup lang="ts">
import SearchIcon from '@/components/Icons/SearchIcon.vue';
import RecipeList from '@/components/RecipeList.vue';
import Spinner from '@/components/Spinner.vue';
import { useStore } from '@/store';
import { computed, reactive, ref } from 'vue';

interface MainPageState {
	searchQuery: string;
}

const store = useStore();

const obs = ref<HTMLDivElement | null>(null);

const recipes = computed(() => store.state.recipes.allRecipes);
const currentPage = computed(() => store.state.recipes.currentPage);
const isLoading = computed(() => store.state.recipes.isLoading);
const changeCurrentPage = (num: number) =>
	store.commit('recipes/changeCurrentPage', num);
const loadMoreRecipes = () => store.dispatch('recipes/loadMoreRecipes');

const state: MainPageState = reactive({
	searchQuery: '',
});

const submit = () => {
	changeCurrentPage(1);

	store.dispatch('recipes/getRecipes', {
		query: state.searchQuery,
		currentPage: currentPage.value,
	});
};
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
.main__title {
	text-align: center;
	font-size: 34px;
	color: rgb(248, 184, 65);
}

.main__input {
	padding: 20px 50px 20px 20px;
	font-size: 18px;
	width: 500px;
	height: 60px;
	border-radius: 10px;
	border: 2px solid rgb(248, 184, 65);
}

.main__input:focus {
	outline: 1px solid rgb(248, 184, 65);
}

.main__search {
	position: relative;
	margin-top: 20px;
}
</style>
