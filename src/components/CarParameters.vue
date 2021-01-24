<template>
    <div v-if="currentCar" class="px-5 pt-5 pb-4">
        <div class="card px-3 pt-5 bg-light">
            <div class="card__header--absolute border">
                <h3 class="text-secondary">Параметри:</h3>
            </div>
            <div class="row mt-2">
                <div v-for="(item, i) in currentCar" :key="i" class="mb-4" :class="item.class">
                    <div class="parametr-card">
                        <i class="parametr-card__icon" :class="item.icon"></i>
                        <div class="parametr-card__text-block">
                            <h5 class="parametr-card__title text-secondary">{{ item.title }}</h5>
                            <p class="parametr-card__description">{{ item.value }}</p>
                        </div>
                    </div>
                </div>
                <div v-if="$store.getters.currentCarByOpenCars.registrations.length" class="col-lg-6 my-4">
                    <div class="parametr-card border rounded px-3 py-1 bg-white">
                        <i class="parametr-card__icon fas fa-barcode"></i>
                        <div class="parametr-card__text-block">
                            <h5 class="parametr-card__title text-secondary">VIN номер</h5>
                            <p class="parametr-card__description parametr-card__description--primary">{{ $store.getters.currentCarByOpenCars.registrations[0].vin }}</p>
                        </div>
                        <button class="btn ml-auto text-secondary"><i class="far fa-copy"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CarParameters',
        props: {
            carInfo: String
        },
        computed: {
            currentCar() {
                let operationsByOpenCars    = this.$store.getters.currentCarByOpenCars.operations,
                    registrationsByOpenCars = this.$store.getters.currentCarByOpenCars.registrations,
                    currentCarByBazaGai     = this.$store.getters.currentCar

                if(operationsByOpenCars.length && registrationsByOpenCars.length && currentCarByBazaGai.operations.length) {   
                   return {
                        color: {
                            title: 'Колір',
                            icon: 'fas fa-palette',
                            value: operationsByOpenCars[0].color,
                            class: 'col-lg-4',
                        },
                        kind: {
                            title: 'Тип',
                            icon: 'fas fa-car',
                            value: operationsByOpenCars[0].kind,
                            class: 'col-lg-4',
                        },
                        fuel: {
                            title: 'Топливо',
                            icon: 'fas fa-gas-pump',
                            value: operationsByOpenCars[0].fuel,
                            class: 'col-lg-4',
                        },
                        weight: {
                            title: 'Вага/Макс. вага',
                            icon: 'fas fa-weight-hanging',
                            value: `${operationsByOpenCars[0].own_weight} / ${operationsByOpenCars[0].total_weight}`,
                            class: 'col-lg-4',
                        },
                        body: {
                            title: 'Категорія/Кузов',
                            icon: 'fas fa-car-side',
                            value: operationsByOpenCars[0].body,
                            class: 'col-lg-4',
                        },
                        num_seating: {
                            title: 'Сидячих місць',
                            icon: 'fas fa-chair',
                            value: registrationsByOpenCars[0].num_seating,
                            class: 'col-lg-4',
                        },
                        date: {
                            title: 'Дата першої реєстрації',
                            icon: 'fas fa-calendar-alt',
                            value: registrationsByOpenCars[0].first_reg_date,
                            class: 'col-lg-4',
                        },
                        address: {
                            title: 'Адреса',
                            icon: 'fas fa-map-marked-alt',
                            value: currentCarByBazaGai.operations[0].address,
                            class: 'col-lg-8',
                        },
                        // vin: {
                        //     title: 'VIN номер',
                        //     icon: 'fas fa-barcode',
                        //     value: registrationsByOpenCars[0].vin
                        // },
                    }
                } else {
                    return
                }
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>