import { createRouter, createWebHistory } from 'vue-router';
import { MainPage, RecipePage } from '@/pages';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'main',
			component: MainPage,
		},
		{
			path: '/recipes/:recipeID',
			name: 'recipe-page',
			component: RecipePage,
		},
	],
});

export default router;
