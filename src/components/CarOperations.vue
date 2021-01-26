<template>
    <div v-if="currentCarByOpenCars.operations.length" class="px-5 pt-5 pb-4">
        <div class="card card-operations bg-light px-3 pt-5">
            <div class="card__header--absolute border">
                <h3 class="text-secondary">Останній запис:</h3>
            </div>
            <div class="row align-items-center  mb-3 mt-2">
                <div class="col-3">
                    <h4 class="m-0 text-center">{{ currentCarByOpenCars.operations[0].date }}</h4>
                </div>
                <div class="col-9">
                    <div class="card bg-white px-4 py-2">
                        <p class="m-0">{{ currentCarByOpenCars.operations[0].registration }}</p>
                        <code>Зроблено в департаменті: {{ currentCarByOpenCars.operations[0].dep }}</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CarOperations',
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