import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import ApiBazaGai from '@/api/baza-gai'
import ApiOpencars from '@/api/opencars'
import {
    vm
} from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        groups: [],
        currentCar: {},
        currentCarByOpenCars: {
            operations: [],
            registrations: [],
        },
        currentCarPrice: ''
    },
    mutations: {
        changeCurrentCar(state, obj) {
            state.currentCar = obj
        },
        operationsByOpenCars(state, arr) {
            state.currentCarByOpenCars.operations = arr
        },
        registrationsByOpenCars(state, arr) {
            state.currentCarByOpenCars.registrations = arr
        }
    },
    actions: {
        GET_INFO_BY_NUMBER_BY_BAZA_GAI: ({
            commit,
            dispatch
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
                    dispatch('GET_AVARANGE_PROCE_FROM_AUTORIA', {
                        vendor: res.data.vendor,
                        model: res.data.model
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        GET_INFO_BY_NUMBER_OPEN_CARS: ({
            commit
        }, payload) => {
            ApiOpencars.operations({
                    params: {
                        number: payload,
                        limit: 10,
                        order: 'desc'
                    }
                })
                .then((res) => {
                    commit('operationsByOpenCars', res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            
            ApiOpencars.registrations({
                    params: {
                        number: payload,
                    }
                })
                .then((res) => {
                    commit('registrationsByOpenCars', res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        GET_AVARANGE_PROCE_FROM_AUTORIA: ({
            commit,
            dispatch
        }, payload) => {
            let formating_string_for_url = (str) => str.toLowerCase().replace(/\s+/g, '-');
            let vendor = formating_string_for_url(payload.vendor),
                model = formating_string_for_url(payload.model),
                autoria_url = `https://auto.ria.com/uk/car/${vendor}/${model}/`

            axios.post('http://pr.loc/price.php', {
                    car: vendor,
                    model: model,
                })
            // axios({
            //   method: 'post',
            //   url: 'http://pr.loc/price.php',
            //   responseType: 'text',
            //   data: {
            //     car: vendor,
            //     model: model,
            //   }
            //   // headers: {'X-Requested-With': 'XMLHttpRequest'},
            // })
                .then((res) => {
                  console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            console.log(autoria_url)
        },
        FORMATING_STRING_FOR_URL: ({
            commit
        }, payload) => {
            return payload.toLowerCase().split(' ').join('-')
        },
    },
    getters: {
        currentCar: state => state.currentCar,
        currentCarByOpenCars: state => state.currentCarByOpenCars,
    }
})