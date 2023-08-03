import { createStore } from 'vuex';

const store = createStore({
	state() {
		return {
			name: "je",
			age: 20,
			likes: 0,
			liked: false
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

		}
	}
});

export default store;
