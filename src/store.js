import Vue from 'vue'
import Vuex from 'vuex'
import ApiBazaGai from '@/api/baza-gai'
import { vm } from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        groups: [],
        currentCar: {}
    },
    mutations: {
        changeCurrentCar(state, obj) {
            state.currentCar = obj
        }
    },
    actions: {
        GET_INFO_BY_NUMBER: ({
            commit
        }, payload) => {
            ApiBazaGai.getInfo(payload)
                .then((res) => {
                    if (vm.$route.name != 'about') {
                        vm.$router.push({
                            name: 'about',
                            params: {
                                id: res.data.digits
                            }
                        })
                    }
                    commit('changeCurrentCar', res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },
    getters: {
        currentCar: state => state.currentCar
    }
})