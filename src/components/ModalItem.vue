<template>
	<transition name="modal">
		<div class="modal">
			<slot></slot>
		</div>
	</transition>
</template>

<style scoped>
.modal {
	background-color: rgba(0, 0, 0, 0.1);
	height: 100%;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 10;
}

.modal-item {
	display: inline-block;
	margin-right: 10px;
}
.modal-enter-active,
.modal-leave-active {
	transition: all 0.4s ease;
}
.modal-enter-from,
.modal-leave-to {
	opacity: 0;
	transform: translateX(0px);
}
</style>
