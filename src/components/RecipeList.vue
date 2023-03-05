<template>
	<div class="recipes__list">
		<transition-group name="recipe-list">
			<card-item
				v-for="recipe in recipes"
				:recipe="recipe"
				:key="recipe.id"
			/>
		</transition-group>
	</div>
</template>

<script setup lang="ts">
import type { RecipeData } from '@/models';

import CardItem from './CardItem.vue';

defineProps<{
	recipes: RecipeData[];
}>();
</script>

<style scoped>
.recipes__list {
	width: 100%;
	display: grid;
	justify-content: space-between;
	margin-top: 20px;
	column-gap: 7px;
	grid-auto-rows: 250px;
	grid-template-columns: repeat(auto-fill, 350px);
	row-gap: 30px;
}
.recipe-list-item {
	display: inline-block;
	margin-right: 10px;
}
.recipe-list-enter-active,
.recipe-list-leave-active {
	transition: all 0.4s ease;
}
.recipe-list-enter-from,
.recipe-list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
</style>
