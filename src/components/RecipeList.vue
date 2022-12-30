<template>
	<div class="recipes">
		<RecipeItem
			v-for="recipe in recipes"
			:recipe="recipe"
			:key="recipe.id"
		/>
	</div>
</template>

<script setup lang="ts">
import type RecipeData from '@/types/interfaces/recipe.interface';
import RecipeItem from './RecipeItem.vue';

defineProps<{
	recipes: RecipeData[];
}>();
</script>

<style scoped>
.recipes {
	width: 100%;
	display: grid;
	justify-content: space-between;
	margin-top: 20px;
	column-gap: 7px;
	grid-auto-rows: 250px;
	grid-template-columns: repeat(auto-fill, 350px);
	row-gap: 30px;
}
</style>
