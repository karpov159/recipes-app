<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
	<div class="app">
		<div class="container">
			<RouterView />
		</div>
	</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap');

* {
	box-sizing: border-box;
	font-family: 'Roboto', sans-serif;
	margin: 0;
	padding: 0;
}
</style>

<style scoped>
.container {
	width: 1140px;
	margin: 0 auto;
}
</style>
