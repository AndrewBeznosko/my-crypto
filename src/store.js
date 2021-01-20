import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        groups: [],
        currentCar: {}
    },
    mutations: {
      changeCurrentCar (state, obj) {
        console.log(obj)
        state.currentCar = obj
      }
    },
    getters: {
        groupById: (state) => (groupId) => {
            return state.groups.find(group => group.id === groupId)
        }
    }
})
