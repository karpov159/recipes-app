import { createRouter, createWebHistory } from 'vue-router';
import { MainPage } from '@/pages';
import { MAIN, RECIPE_PAGE, FAVORITE } from '@/core/config/RoutesConfig';
import RecipesItem from '@/components/RecipesItem.vue';
import RecipeItem from '@/components/RecipeItem.vue';
import FavoriteList from '@/components/FavoriteList.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: MAIN,
			component: MainPage,
			children: [
				{
					path: '/',
					component: RecipesItem,
				},
				{
					path: RECIPE_PAGE,
					component: RecipeItem,
				},
				{
					path: FAVORITE,
					component: FavoriteList,
				},
			],
		},
	],
});

export default router;
