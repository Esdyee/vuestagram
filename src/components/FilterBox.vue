<script setup>

</script>

<template>
	<div :class="`${filter} filter-item`"
		:style="{ backgroundImage: `url(${selectedImage})`}"
	>
		<slot style="color: black"></slot>
		<button @click="fire">적용</button>
	</div>
</template>

<script>
export default {
	name: "FilterBox",
	props: {
		filter: String,
		selectedImage: String,
	},
	methods: {
		fire() {
			this.emitter.emit('emitFire', this.filter);
		}
	}
}
</script>

<style scoped>
.filter-item {
	width: 100px;
	height: 100px;
	margin: 10px 10px 10px auto;
	padding: 8px;
	display: inline-block;
	color : white;
	background-size: cover;
	background-position : center;
}
</style>
