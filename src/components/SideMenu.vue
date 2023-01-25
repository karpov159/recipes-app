<template>
	<nav class="menu">
		<h1 class="menu__title">Recipes App</h1>

		<div class="menu__tabs">
			<div
				@click="changeTab(name, path)"
				class="menu__tab"
				:class="{ menu__tab_active: activeTab === name }"
				v-for="{ name, icon, path } in tabs"
			>
				<div class="menu__tab-icon">
					<component :is="icon"></component>
				</div>
				<div class="menu__tab-text">{{ name }}</div>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { useStore } from '@/core/store';
import { computed } from 'vue';
import { RecipeIcon, FavoriteIcon } from './Icons';
import { useRouter } from 'vue-router';
import { MAIN, FAVORITE } from '@/core/config/RoutesConfig';

const router = useRouter();

const store = useStore();

const activeTab = computed(() => store.state.recipes.activeTab);

const setActiveTab = (name: string) =>
	store.commit('recipes/setActiveTab', name);

const changeTab = (name: string, path: string) => {
	router.push(path);

	setActiveTab(name);
};

const tabs = [
	{
		name: 'Recipes',
		icon: RecipeIcon,
		path: MAIN,
	},
	{
		name: 'Favorite',
		icon: FavoriteIcon,
		path: FAVORITE,
	},
];
</script>

<style scoped>
.menu {
	width: 100%;
	height: 100%;
	padding: var(--component-paddings);
	position: sticky;
}

.menu__title {
	font-size: 28px;
	color: var(--main-color);
	cursor: default;
}

.menu__tabs {
	margin-top: 30px;
}

.menu__tab {
	cursor: pointer;
	color: var(--text-color);
	font-size: 20px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 10px;
	fill: var(--text-color);
	margin-top: 20px;
}

.menu__tab_active {
	background-color: var(--bg-color);
	fill: var(--main-color);
	color: var(--main-color);
}

.menu__tab-icon {
	width: 30px;
	height: 25px;
}

.menu__tab-icon svg {
	width: 100%;
	height: 100%;
}

.menu__tab-text {
	margin-left: 10px;
}
</style>
