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

		<div class="recipes">
			<RecipeItem
				v-for="recipe in recipes"
				:recipe="recipe"
				:key="recipe.id"
			/>
		</div>

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
import RecipeItem from '@/components/RecipeItem.vue';
import { useStore } from '@/store';
import { computed, reactive, ref } from 'vue';

interface MainPageState {
	searchQuery: string;
}

const store = useStore();

const obs = ref<HTMLDivElement | null>(null);

const recipes = computed(() => store.state.recipes.allRecipes);
const currentPage = computed(() => store.state.recipes.currentPage);
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
}
.main__title {
	text-align: center;
}

.main__input {
	padding: 20px 50px 20px 20px;
	font-size: 18px;
	width: 500px;
	height: 60px;
	border-radius: 10px;
}

.main__search {
	position: relative;
	margin-top: 20px;
}

.recipes {
	width: 100%;
	display: grid;
	justify-content: space-between;
	margin-top: 20px;
	grid-row-gap: 30px;
	grid-column-gap: 15px;
	-webkit-column-gap: 15px;
	column-gap: 15px;
	grid-auto-rows: 300px;
	grid-template-columns: repeat(auto-fill, 350px);
	row-gap: 30px;
}
</style>
