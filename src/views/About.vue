<template>
    <div class="about">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-10">
                    <div class="card bg-dark text-dark my-5 bg-white">
                        <div class="card__img-block d-flex align-items-end border-bottom">
                            <img :src="currentCar.photoUrl" class="card__object-fit" :alt="currentCar.vendor + ' ' + currentCar.model">
                            <div class="card__img-block-content d-flex justify-content-between px-5 pb-3 w-100">
                                <h1 class="card-title fw-bold m-0">{{ currentCar.vendor + ' ' + currentCar.model }}</h1>
                                <h1 class="m-0 d-flex align-self-center"><span class="badge rounded-pill bg-success">≈ &nbsp; $8000</span></h1>
                            </div>
                        </div>
                        <div class="px-5 pt-5 pb-4">
                          <h2>Параметри:</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        name: 'About',
        computed: {
            currentCar() {
                return this.$store.getters.currentCar
            },
            carFullName: () => this.currentCar.vendor + ' ' + this.currentCar.model,
        },
        mounted() {
            this.$store.dispatch('GET_INFO_BY_NUMBER', this.$route.params.id);
        }
    }
</script>

<style scoped lang="scss">
    .card {
        &__img-block {
            position: relative;
            min-height: 600px;
            position: relative;

            &::after {
              content: '';
              display: block;
              width: 100%;
              height: 100px;
              position: absolute;
              bottom: 0;
              left: 0;
              background: rgb(255,255,255);
              background: linear-gradient(0deg, rgba(255,255,255,1) 40%, transparent 100%);
            }
        }

        &__object-fit {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        &__img-block-content {
            z-index: 1;
        }
    }
</style>