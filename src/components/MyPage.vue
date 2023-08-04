<script setup>

</script>

<template>
	<div style="padding : 10px">
		<h4>팔로워</h4>
		<input placeholder="?"  @input="searchFollower"/>
		<div class="post-header">
			<div class="profile" v-for="(follow, index) in follower" :key="index">
				<div class="profile-icon"
				:style="`background-image: url('https://picsum.photos/100?random=${index}')`"></div>
				<div>
					<span class="profile-name">{{ follow.name }}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {onMounted, ref} from "vue";
import axios from "axios";

export default {
	name: "MyPage",
	setup() {
		let follower = ref([]);
		let originFollower = ref([]);
		onMounted(() => {
			axios.get('/follower.json').then((res) => {
				follower.value = res.data;
				originFollower.value = res.data;
			})
		})

		function searchFollower(event) {
			let searchValue = event.target.value;
			follower.value = originFollower.value.filter((follow) => {
				// console.log(searchValue, follow.name.includes(searchValue));
				return follow.name.includes(searchValue);
			})
		}

		return { follower, originFollower, searchFollower }
	},
	data() {
		return {

		}
	}
}
</script>
<style scoped>
.post {
	width: 100%;
}
.profile {
	display: flex;
	margin-top: 10px;
}
.profile-icon {
	//background-image: url("https://picsum.photos/100?random=0");
	width: 30px;
	height: 30px;
	background-size: 100%;
	border-radius: 50%;
}
.profile-name {
	display: block;
	padding-left: 10px;
	padding-top: 7px;
	font-size: 14px;
}

</style>
