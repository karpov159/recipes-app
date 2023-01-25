<template>
	<main class="recipe">
		<div v-if="state.recipe" class="recipe__content">
			<div class="recipe__info">
				<img
					class="recipe__img"
					:src="`${state.recipe.image}`"
					:alt="`${state.recipe.title}`"
				/>

				<div class="recipe__info-block">
					<div class="recipe__info-headline">
						<h1 class="recipe__title">{{ state.recipe.title }}</h1>
						<button-item @click="router.go(-1)"
							>Get back</button-item
						>
					</div>

					<div class="recipe__descr">
						<div class="recipe__text">
							{{ state.recipe.servings }} servings
						</div>
						<div class="recipe__text">
							Ready in {{ state.recipe.readyInMinutes }} minutes
						</div>
						<div class="recipe__diets">
							<div class="recipe__text">Diets: {{ diets }}</div>
						</div>
					</div>
				</div>
			</div>

			<h4 class="recipe__subtitle">Description</h4>
			<div v-html="state.recipe.summary" class="recipe__text"></div>

			<h4 class="recipe__subtitle">Instructions</h4>

			<div class="recipe__text" v-html="state.recipe.instructions"></div>

			<h4 class="recipe__subtitle">Ingredients</h4>

			<div class="recipe__ingredients">
				<div
					class="recipe__ingredient"
					v-for="item in state.recipe.extendedIngredients"
				>
					<div class="recipe__text">
						{{
							item.amount +
							' ' +
							(item.unit ? item.unit : 'piece')
						}}
					</div>

					<div class="recipe__ingredient-img">
						<img :src="IMG_PATH + item.image" :alt="item.name" />
					</div>
					<div class="recipe__text recipe__text_center">
						{{ item.name }}
					</div>
				</div>
			</div>
		</div>
		<spinner-item v-else />
	</main>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/core/store';
import SpinnerItem from '@/components/SpinnerItem.vue';
import { IMG_PATH } from '@/shared/constants';
import type { RecipeInfo } from '@/types/interfaces';

interface RecipeState {
	recipe: null | RecipeInfo;
}

const store = useStore();

const route = useRoute();
const router = useRouter();

const id = route.params.recipeID as string;

const state: RecipeState = reactive({
	recipe: null,
});

const fetchRecipe = (id: string) => store.dispatch('recipes/fetchRecipe', id);

const diets = computed(() => {
	let str = '';

	const dietsArr = state.recipe?.diets!;

	for (let i = 0; i < dietsArr.length; i++) {
		if (i + 1 === dietsArr.length) {
			str += dietsArr[i];
		} else {
			str += dietsArr[i] + ', ';
		}
	}

	return str;
});

onBeforeMount(() => {
	fetchRecipe(id).then((res) => {
		state.recipe = res;
	});
});
</script>

<style scoped>
.recipe {
	position: relative;
	width: 100%;
	padding: var(--component-paddings);
	background-color: var(--bg-color);
}
.recipe__content {
	width: 100%;
	display: flex;
	flex-direction: column;
}

.recipe__title {
	color: var(--main-color);
}

.recipe__subtitle {
	margin-top: 10px;
	color: var(--main-color);
	font-size: 20px;
}

.recipe__info {
	display: flex;
}

.recipe__info-block {
	width: 100%;
	margin-left: 30px;
}

.recipe__info-headline {
	display: flex;
	width: 100%;
	justify-content: space-between;
}
.recipe__img {
	width: 500px;
}

.recipe__descr {
	margin-top: 10px;
}

.recipe__text {
	margin-top: 10px;
	font-size: 18px;
	margin-right: 5px;
	color: var(--text-color);
	text-align: justify;
}

.recipe__text_center {
	text-align: center;
}

.recipe__diets {
	display: flex;
}

.recipe__button {
	position: absolute;
	left: 0;
	top: 0;
}

.recipe__ingredients {
	width: 66%;
	display: grid;
	grid-template-columns: repeat(8, 120px);
	grid-template-rows: 200px;
	grid-auto-rows: 200px;
	row-gap: 20px;
	column-gap: 20px;
}

.recipe__ingredient {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.recipe__ingredient-img {
	width: 120px;
	height: 105px;
	background-color: var(--bg-color);
	display: flex;
	justify-content: center;
	align-items: center;
}

.recipe__ingredient-img img {
	max-width: 100px;
	max-height: 69px;
}

:deep(a) {
	color: var(--text-color);
}

:deep(span) {
	color: var(--text-color) !important;
}
</style>
