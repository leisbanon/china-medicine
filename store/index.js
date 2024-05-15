import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// State
const state = {
	user_info: {
		name: 'Leisbanon'
	}
}

// Getters
const getters = {
}

// Mutations
const mutations = {
	
}


const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions: {},
})

export default store