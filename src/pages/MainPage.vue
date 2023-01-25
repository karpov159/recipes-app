<template>
	<section class="main">
		<SideMenu />
		<RouterView />
	</section>
</template>

<script setup lang="ts">
import SideMenu from '@/components/SideMenu.vue';
import { RouterView } from 'vue-router';
</script>

<style scoped>
.main {
	display: grid;
	grid-template-columns: 0.2fr 1fr;
	height: 100vh;
}
</style>
