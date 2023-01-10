<template>
	<div @click.stop class="filters">
		<h2 class="filters__title">Select search terms</h2>

		<div @click="closeFilters" className="filters__close">&times;</div>

		<h4 class="filters__subtitle">Cuisine</h4>

		<div class="filters__options">
			<CheckboxItem
				v-for="cuisine in Object.values(state.cuisineList)"
				@update:value="updateCuisineList"
				:cuisine="cuisine"
				:key="cuisine.id"
			/>
		</div>

		<button class="filters__button" @click="saveFilters">
			Save changes
		</button>
	</div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { reactive } from 'vue';
import type { CuisineData } from '@/types/interfaces';
import CheckboxItem from './UI/CheckboxItem.vue';

interface StateData {
	cuisineList: Record<string, CuisineData>;
	filterQuery: string;
}

const store = useStore();

const state: StateData = reactive({
	cuisineList: {
		1: {
			name: 'African',
			value: false,
			id: '1',
		},
		2: {
			name: 'American',
			value: false,
			id: '2',
		},
		3: {
			name: 'British',
			value: false,
			id: '3',
		},
		4: {
			name: 'Caribbean',
			value: false,
			id: '4',
		},
		5: {
			name: 'Chinese',
			value: false,
			id: '5',
		},
		6: {
			name: 'Eastern European',
			value: false,
			id: '6',
		},
		7: {
			name: 'European',
			value: false,
			id: '7',
		},
		8: {
			name: 'French',
			value: false,
			id: '8',
		},
		9: {
			name: 'German',
			value: false,
			id: '9',
		},
		10: {
			name: 'Greek',
			value: false,
			id: '10',
		},
		11: {
			name: 'Indian',
			value: false,
			id: '11',
		},
		12: {
			name: 'Irish',
			value: false,
			id: '12',
		},
		13: {
			name: 'Italian',
			value: false,
			id: '13',
		},
		14: {
			name: 'Japanese',
			value: false,
			id: '14',
		},
		15: {
			name: 'Korean',
			value: false,
			id: '15',
		},
		16: {
			name: 'Latin American',
			value: false,
			id: '16',
		},
		17: {
			name: 'Mexican',
			value: false,
			id: '17',
		},
		18: {
			name: 'Middle Eastern',
			value: false,
			id: '18',
		},
		19: {
			name: 'Spanish',
			value: false,
			id: '19',
		},
		20: {
			name: 'Thai',
			value: false,
			id: '20',
		},
	},
	filterQuery: '',
});

const setFilterQuery = (query: string) =>
	store.commit('recipes/setFilterQuery', query);

const updateCuisineList = (id: string) => {
	state.cuisineList[id].value = !state.cuisineList[id].value;
};

const setFiltersOpened = (bool: boolean) =>
	store.commit('recipes/setFiltersOpened', bool);

const getRecipes = () => {
	store.dispatch('recipes/getRecipes', store.state.recipes.lastSearchQuery);
};

const closeFilters = () => {
	setFiltersOpened(false);
};

const saveFilters = () => {
	const filterQuery = Object.values(state.cuisineList)
		.filter((item) => item.value)
		.map((item) => item.name)
		.join(', ');

	setFilterQuery(filterQuery);

	getRecipes();

	closeFilters();
};
</script>

<style scoped>
.filters {
	display: flex;
	flex-direction: column;
	background-color: #fff;
	padding: 20px;
	height: 500px;
	margin: 80px auto 0 auto;
	overflow: auto;
	position: relative;
	width: 600px;
	border-radius: 10px;
	border: 2px solid var(--main-color);
}

.filters__title {
	text-align: center;
	color: rgb(70, 69, 69);
}

.filters__options {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	margin-top: 10px;
}

.filters__close {
	font-size: 50px;
	color: var(--main-color);
	font-weight: 500;
	position: absolute;
	top: 5px;
	right: 20px;
	cursor: pointer;
}

.filters__subtitle {
	margin-top: 10px;
}

.filters__button {
	position: absolute;
	right: 20px;
	bottom: 20px;
	padding: 5px;
	width: 120px;
	cursor: pointer;
	font-size: 16px;
	border: 2px solid var(--main-color);
	border-radius: 10px;
	background: none;
	text-decoration: none;
	transition: all 0.4s;
}
</style>
