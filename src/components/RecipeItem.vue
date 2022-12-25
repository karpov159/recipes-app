<template>
	<div class="recipe">
		<img
			class="recipe__img"
			:src="`${recipe.image}`"
			:alt="`${recipe.title}`"
		/>
		<div class="recipe__title">{{ recipe.title }}</div>
	</div>
</template>

<script setup lang="ts">
import type RecipeData from '@/types/interfaces/recipe.interface';

defineProps<{
	recipe: RecipeData;
}>();
</script>

<style scoped>
.recipe {
	height: 300px;
	position: relative;
	width: 350px;
}

.recipe__title {
	font-size: 18px;
	text-align: center;
}

.recipe__img {
	width: 100%;
	height: 250px;
	border-radius: 10px;
}
</style>
