<template>
    <div>
        <div class="car-bg">
            <div class="container">
                <div class="row justify-content-center align-items-center min-vh-100 py-3">
                    <div class="my-3 plate-page text-center">
                        <form @submit.prevent="getInfo" class="number">
                            <div class="number__flag">
                                <div class="number__flag-icon">
                                    <div class="number__flag-blue"></div>
                                    <div class="number__flag-yellow"></div>
                                </div>
                                <div class="number__country">UA</div>
                            </div>
                            <input v-model.trim="number" type="text" class="number__text" id="number" placeholder="AA9359PC" required>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="min-vh-100 d-flex align-items-center justify-content-center">
            <CarsStats/>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import ApiOpencars from '@/api/opencars'
    import ApiBazaGai from '@/api/baza-gai'
    import CarsStats from '@/components/CarsStats.vue'
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        name: 'Home',
        components: {
            CarsStats,
        },
        data() {
            return {
                number: 'AA9359PC',
            }
        },
        computed: mapState({
            currentCar: state => state.currentCar
        }),
        methods: {
            ...mapMutations([
                'changeCurrentCar',
            ]),
            getOperations() {
                ApiOpencars.operations({
                        params: {
                            number: this.number,
                            limit: 10,
                            order: 'desc'
                        }
                    })
                    .then((res) => {
                        this.changeCurrentCar(res.data)
                        this.$router.push({
                            name: 'about',
                            params: {
                                id: this.currentCar.digits
                            }
                        })
                    })
                    .catch((err) => {
                        // console.log(err)
                    })
            },
            getInfo() {
                this.$store.dispatch('GET_INFO_BY_NUMBER_BY_BAZA_GAI', this.number);
                this.$store.dispatch('GET_INFO_BY_NUMBER_OPEN_CARS', this.number);
                // ApiBazaGai.getInfo(this.number)
                //     .then((res) => {
                //         this.changeCurrentCar(res.data)
                //         this.$router.push({ name: 'about', params: {id: this.currentCar.digits}})
                //     })
                //     .catch((err) => {
                //         console.log(err)
                //     })
            }
        },
    }
</script>

<style scoped lang="scss">
    .number {
        display: inline-flex;
        border: 3px solid #484848;
        font-size: 3.2rem;
        border-radius: 5px;
        width: auto;

        &__text {
            padding: 2px 50px;
            flex-grow: 3;
            max-width: 360px;
            text-transform: uppercase;
        }

        &__flag {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: #2860ab;
            color: white;
            padding: 12px 0 6px;
            align-items: center;
            width: 50px
        }

        &__flag-icon {
            width: 32px;
        }

        &__flag-blue {
            background: #3a75c4;
            height: 10px;
        }

        &__flag-yellow {
            background: #f9dd16;
            height: 10px;
        }

        &__country {
            font-size: 1.4rem;
        }
    }


    .number-medium {
        font-size: 1.8rem;
        width: 100%;

        .number {
            &__text {
                padding: 0.5rem;
                text-align: center;
            }

            &__flag {
                width: 24px;
                padding: 8px 0 4px;
            }

            &__flag-icon {
                width: 24px;
            }

            &__country {
                font-size: 1rem;
            }

            &__flag-blue {
                height: 8px;
            }

            &__flag-yellow {
                height: 8px;
            }
        }
    }
</style>