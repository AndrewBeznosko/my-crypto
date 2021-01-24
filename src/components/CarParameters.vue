<template>
    <div class="px-5 pt-5 pb-4">
        <h2>Параметри:</h2>
        <div class="row">
            <div class="col-lg-4">
                <div class="parametr-card">
                    <i class="parametr-card__icon fas fa-palette"></i>
                    <div class="parametr-card__text-block">
                        <h5 class="parametr-card__title text-secondary">Title</h5>
                        <p class="parametr-card__description">description</p>
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