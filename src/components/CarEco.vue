<template>
    <div v-if="currentCarByOpenCars" class="px-5 pt-5 pb-4">
        <div class="card card-eco px-3 pt-5">
            <div class="card__header--absolute border">
                <h3 class="text-secondary">Екологічний клас:</h3>
            </div>
            <div class="row mb-3 mt-2">
                <div class="col-auto mb-4">
                    <div class="parametr-card pl-4 ml-4">
                        <div class="parametr-card__text-block">
                            <h5 class="parametr-card__title text-secondary text-white">Країна виробник:</h5>
                            <p class="parametr-card__description text-white">United States</p>
                        </div>
                    </div>
                </div>
                <div class="col-auto mb-4">
                    <div class="parametr-card">
                        <div class="parametr-card__text-block">
                            <h5 class="parametr-card__title text-secondary text-white">Рік:</h5>
                            <p class="parametr-card__description text-white">2016</p>
                        </div>
                    </div>
                </div>
                <div class="col-auto mb-4 ml-auto mr-5">
                    <div class="parametr-card">
                        <div class="parametr-card__text-block parametr-card__text-block--before-hidden">
                            <h2 class="text-white m-0">
                                <span class="badge badge-lg bg-success">Euro 5a</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="px-4 mx-4">
                        <img class="img-fluid" src="@/assets/img/eco/eco_euro_5a.jpg" alt="eco_details">
                    </div>
                </div>
                <div class="col-12">
                    <img class="img-fluid" src="@/assets/img/eco/eco_details.png" alt="eco_details">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CarEco',
        props: {
            carInfo: String
        },
        computed: {
            currentCarByOpenCars() {
                return this.$store.getters.currentCarByOpenCars
            },
        }
    }
</script>

<style scoped lang="scss">
 
</style>