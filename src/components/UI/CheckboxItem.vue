<template>
	<div class="checkbox">
		<input
			class="checkbox__input"
			type="checkbox"
			:id="cuisine.id"
			@click="onClick"
			:value="cuisine.value"
		/>
		<label class="checkbox__label" :htmlFor="cuisine.id">
			{{ cuisine.name }}
		</label>
	</div>
</template>

<script setup lang="ts">
import type { CuisineData } from '@/models';

const props = defineProps<{
	cuisine: CuisineData;
}>();

const emit = defineEmits<{
	(e: 'update:value', id: string): void;
}>();

const onClick = () => {
	emit('update:value', props.cuisine.id);
};
</script>

<script lang="ts">
export default {
	name: 'CheckboxItem',
};
</script>

<style scoped>
.checkbox {
	display: flex;
	align-items: center;
	width: 110px;
	height: 40px;
}

.checkbox__input {
	opacity: 0;
	width: 18px;
	height: 18px;
	position: absolute;
}

.checkbox__input:checked + label::after {
	content: '✓';
	font-weight: 700;
	position: absolute;
	width: 18px;
	height: 18px;
	left: -23px;
	bottom: 50%;
	transform: translateY(50%);
	color: var(--main-color);
}

.checkbox__label {
	position: relative;
	margin-left: 30px;
	font-weight: 400;
	font-size: 14px;
	line-height: 17px;
	color: #2d3436;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
}

.checkbox__label::before {
	position: absolute;
	content: '';
	width: 18px;
	height: 18px;
	border: 2px solid var(--main-color);
	left: -29px;
}
</style>
