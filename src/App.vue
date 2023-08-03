<script setup>
import Container from "./components/Container.vue";
import axios from 'axios';
</script>
<template>
	<div class="header">
		<ul class="header-button-left">
			<li>Cancel</li>
		</ul>
		<ul class="header-button-right">
			<li v-if="activeMenu !== 2" @click="activeMenu = 2">Next</li>
			<li v-if="activeMenu === 2" @click="publish">발행</li>
		</ul>
		<img src="./assets/logo.png" class="logo"/>
	</div>
	<pre>
		{{ content }}
	</pre>
	<Container :instaData="insta"
	:activeMenu="activeMenu"
	:selectedImage="selectedImage"
	:content="content"
	@update:content="updateContent"
	/>
	<button @click="more">더보기</button>

	<div class="footer">
		<ul class="footer-button-plus">
			<input @change="uploadImage" type="file" id="file" class="inputfile"
			accept="image/*"
			/>
			<label for="file" class="input-plus">+</label>
		</ul>
	</div>
</template>

<script>
import instaData from "@/assets/instaData";

export default {
	name: 'App',
	data() {
		return {
			insta: instaData,
			moreCount: 0,
			activeMenu: 0,
			selectedImage: null,
			content: "Test"
		}
	},
	components: {},
	methods: {
		more() {
			axios.get(`https://codingapple1.github.io/vue/more${this.moreCount}.json`)
				.then((res) => {
					console.log(res.data);
					// this.insta = [...this.insta, ...res.data];
					this.insta.push(res.data);
					this.moreCount++;
				})
				.catch((err) => {
					console.log(err);
				})
		},
		uploadImage(e) {

			// not image return false
			if (!e.target.files[0].type.includes('image')) {
				alert('이미지만 업로드 가능합니다.');
				return false;
			}

			let file = e.target.files[0];
			let imgUrl = URL.createObjectURL(file);
			console.log(imgUrl)
			this.selectedImage = imgUrl;
			this.activeMenu = 1;
		},
		publish() {
			this.insta.unshift(
				{
					name: "Je",
					userImage: "https://picsum.photos/100?random=3",
					postImage: this.selectedImage,
					likes: 36,
					date: "May 15",
					liked: false,
					content: this.content,
					filter: "perpetua"
				}
			)
			this.selectedImage = null;
			this.writedText = this.content;
			this.activeMenu = 0;
		},
		updateContent(value) {
			this.content = value;
		}
	}
}
</script>

<style>
body {
	margin: 0;
}

ul {
	padding: 5px;
	list-style-type: none;
}

.logo {
	width: 22px;
	margin: auto;
	display: block;
	position: absolute;
	left: 0;
	right: 0;
	top: 13px;
}

.header {
	width: 100%;
	height: 40px;
	background-color: white;
	padding-bottom: 8px;
	position: sticky;
	top: 0;
}

.header-button-left {
	color: skyblue;
	float: left;
	width: 50px;
	padding-left: 20px;
	cursor: pointer;
	margin-top: 10px;
}

.header-button-right {
	color: skyblue;
	float: right;
	width: 50px;
	cursor: pointer;
	margin-top: 10px;
}

.footer {
	width: 100%;
	position: sticky;
	bottom: 0;
	padding-bottom: 10px;
	background-color: white;
}

.footer-button-plus {
	width: 80px;
	margin: auto;
	text-align: center;
	cursor: pointer;
	font-size: 24px;
	padding-top: 12px;
}

.sample-box {
	width: 100%;
	height: 600px;
	background-color: bisque;
}

.inputfile {
	display: none;
}

.input-plus {
	cursor: pointer;
}

#app {
	box-sizing: border-box;
	font-family: "consolas";
	margin-top: 60px;
	width: 100%;
	max-width: 460px;
	margin: auto;
	position: relative;
	border-right: 1px solid #eee;
	border-left: 1px solid #eee;
}
</style>
