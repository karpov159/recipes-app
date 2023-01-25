<template>
	<button class="button">
		<slot></slot>
	</button>
</template>

<script setup lang="ts"></script>

<script>
export default {
	name: 'ButtonItem',
};
</script>

<style scoped>
.button {
	padding: 10px 15px;
	background: none;
	color: var(--main-color);
	border: 1px solid var(--main-color);
	font-size: 16px;
	cursor: pointer;
	text-transform: uppercase;
}
</style>
