import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
	state() {
		return {
			name: "je",
			age: 20,
			likes: 0,
			liked: false,
			moreCount: 0,
			more: {}
		};
	},
	mutations : {
		changeName(state, payload) {
			state.name = payload;
		},
		addAge(state, payload) {
			state.age += payload;
		},
		addLike(state) {
			console.log("###addLike");
			if(!state.liked) {
				state.likes = state.likes + 1;
				state.liked = !state.liked;
			} else {
				state.likes -= state.likes;
				state.liked = !state.liked;
			}
		},
		setMore(state, payload) {
			state.more = payload;
		}
	},
	actions: {
		getData(context) {
			axios.get(`https://codingapple1.github.io/vue/more0.json`)
				.then((res) => {
					context.commit("setMore", res.data);
				})
				.catch((err) => {
					console.log(err);
				})
		}
	}
});

export default store;
