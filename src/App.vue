<template>
	<RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap');

* {
	box-sizing: border-box;
	font-family: 'Roboto', sans-serif;
	margin: 0;
	padding: 0;
}

:root {
	--main-color: rgb(248, 184, 65);
	--second-color: rgb(9, 107, 219);
	--text-color: rgb(90, 87, 87);
	--bg-color: rgb(248, 248, 248);
	--component-paddings: 50px;
}
</style>
