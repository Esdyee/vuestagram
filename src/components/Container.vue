<script setup>
import Post from "./Post.vue";
import FilterBox from "@/components/FilterBox.vue";
import MyPage from "@/components/MyPage.vue";
</script>

<template>
	<div>
		<div v-if="activeMenu === 0">
			<Post v-for="(insta, index) in instaData" :instaData="insta" :key="index"/>
		</div>

		<!-- 필터선택페이지 -->
		<div v-if="activeMenu === 1">
			<div :class="selectedFilter" class="upload-image"
			:style="{backgroundImage: `url(${selectedImage})`}"
			></div>
			<div class="filters">
				<FilterBox v-for="(filter, index) in filterList"
					:filter="filter"
					:key="index"
					:selectedImage="selectedImage"
				><span style="color: black">{{ filter }}</span></FilterBox>
			</div>
		</div>


		<!-- 글작성페이지 -->
		<div v-if="activeMenu === 2">
			<div class="upload-image" :class="selectedFilter"
				:style="{backgroundImage: `url(${selectedImage})`}"
			></div>
			<div class="write">
				<textarea
					@input="$emit('update:content', $event.target.value)"
					class="write-box"></textarea>
			</div>
		</div>

		<div v-if="activeMenu === 3">
			<MyPage />
		</div>

	</div>
</template>

<script>
export default {
	name: "Container",
	data() {
		return {
			filterList: [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson",
				"inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua",
				"reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],
			selectedFilter: ""
		}
	},
	props: {
		instaData: Array,
		activeMenu: Number,
		selectedImage: String,
		writedText: String,
	},
	mounted() {
		this.emitter.on('emitFire', (value) => {
			this.selectedFilter = value;
		})
	}
}
</script>

<style scoped>
.upload-image{
	width: 100%;
	height: 450px;
	background: cornflowerblue;
	background-size : cover;
}
.filters{
	overflow-x:scroll;
	white-space: nowrap;
}
.filter-1 {
	width: 100px;
	height: 100px;
	background-color: cornflowerblue;
	margin: 10px 10px 10px auto;
	padding: 8px;
	display: inline-block;
	color : white;
	background-size: cover;
}
.filters::-webkit-scrollbar {
	height: 5px;
}
.filters::-webkit-scrollbar-track {
	background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
	background: #888;
	border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
	background: #555;
}
.write-box {
	border: none;
	width: 90%;
	height: 100px;
	padding: 15px;
	margin: auto;
	display: block;
	outline: none;
}
</style>
