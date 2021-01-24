<template>
    <div v-if="currentCarByOpenCars" class="px-5 pt-5 pb-4">
        <div class="card px-3 pt-5">
            <div class="card__header--absolute">
                <h3 class="text-secondary">Параметри:</h3>
            </div>
            <div class="row">
                <div v-for="(item, i) in currentCarByOpenCars" :key="i" class="col-lg-4 mb-4">
                    <div class="parametr-card">
                        <i class="parametr-card__icon" :class="item.icon"></i>
                        <div class="parametr-card__text-block">
                            <h5 class="parametr-card__title text-secondary">{{ item.title }}</h5>
                            <p class="parametr-card__description">{{ item.value }}</p>
                        </div>
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
            currentCarByOpenCars() {
                let info = this.$store.getters.currentCarByOpenCars
                if(info.length) {   
                   return {
                        color: {
                            title: 'Колір',
                            icon: 'fas fa-palette',
                            value: info[0].color
                        },
                        kind: {
                            title: 'Тип',
                            icon: 'fas fa-car',
                            value: info[0].kind
                        },
                        fuel: {
                            title: 'Топливо',
                            icon: 'fas fa-gas-pump',
                            value: info[0].fuel
                        },
                        weight: {
                            title: 'Масса/Макс. масса',
                            icon: 'fas fa-weight-hanging',
                            value: `${info[0].own_weight} / ${info[0].total_weight}`
                        },
                        body: {
                            title: 'Категория/Кузов',
                            icon: 'fas fa-car-side',
                            value: info[0].body
                        },
                        date: {
                            title: 'Дата першої реєстрації',
                            icon: 'fas fa-calendar-alt',
                            value: info[info.length-1].date
                        },
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
    .parametr-card {
        display: flex;
        align-items: center;

        &__icon {
            width: 2.2rem;
            height: 2.2rem;
        }

        &__text-block {
            margin-left: 1.6rem;
            position: relative;

            &::before {
                content: '';
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: -15px;
                width: 1px;
                height: 35px;
                border-left: 1px solid #dee2e6;
            }
        }

        &__title {
            margin: 0;
        }

        &__description {
            font-size: 1.4rem;
            margin: 0;
            line-height: 1;
        }
    }
</style>