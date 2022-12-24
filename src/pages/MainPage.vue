<template>
	<div class="main">
		<h1 class="main__title">Recipes App</h1>
		{{ state.searchQuery }}
		<input
			v-model="state.searchQuery"
			class="main__input"
			placeholder="Search for recipes"
			type="text"
		/>
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import axios from 'axios';

interface MainPageState {
	searchQuery: string;
}

const state: MainPageState = reactive({
	searchQuery: '',
});

const fetchRecepies = async () => {
	try {
		const response = await axios.get(
			'https://api.spoonacular.com/recipes/complexSearch',
			{
				params: {
					apiKey: 'a0eb9f69a5b84518ac4032f20a005969',
					query: 'chicken',
					offset: 100,
				},
			}
		);

		console.log(response.data);
	} catch (error) {
		throw error;
	}
};

onMounted(() => {
	fetchRecepies();
});
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
	padding: 20px;
	font-size: 18px;
	width: 500px;
	height: 60px;
	border-radius: 10px;
	margin-top: 30px;
}
</style>
