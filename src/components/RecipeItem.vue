<template>
	<div @click="router.push(`/recipes/${recipe.id}`)" class="recipe">
		<img
			class="recipe__img"
			:src="`${recipe.image}`"
			:alt="`${recipe.title}`"
		/>
		<div class="recipe__title">{{ recipe.title }}</div>
	</div>
</template>

<script setup lang="ts">
import type { RecipeData } from '@/types/interfaces';
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps<{
	recipe: RecipeData;
}>();
</script>

<style scoped>
.recipe {
	height: 250px;
	position: relative;
	width: 350px;
	cursor: pointer;
}

.recipe__title {
	color: #fff;
	font-size: 18px;
	position: absolute;
	text-align: center;
	width: 50%;
	margin: auto;
	top: 50%;
	transform: translateY(-50%);
	left: 0;
	right: 0;
}

.recipe__img {
	width: 100%;
	height: 100%;
	border-radius: 10px;
	filter: brightness(60%);
}
</style>
