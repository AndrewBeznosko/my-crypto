<template>
    <div class="small">
        <line-chart :chart-data="datacollection" :options="options"></line-chart>
    </div>
</template>

<script>
    import LineChart from '@/components/LineChart.js'

    export default {
        components: {
            LineChart
        },
        data() {
            return {
                datacollection: null,
                options: {
                    maintainAspectRatio: false,
                    aspectRatio: 2,
                    responsive: true,
                    title: {
                        display: false,
                        text: 'Темпи розвитку автомобілів 2013-2020. \n\n Візуалізовано електро, дизельні та бензинові',
                        fontColor: '#fff',
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 16,
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Рік реєстрації',
                                fontColor: 'rgba(255,255,255, 0.8)',
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: 16,
                            },
                            ticks: {
                                fontColor: 'rgba(255,255,255, 0.3)',
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: 12,
                            },
                        }],
                        yAxes: [{
                            display: true,
                            // type: 'logarithmic',
                            scaleLabel: {
                                display: true,
                                labelString: 'Кількість зареєстрованих',
                                fontColor: 'rgba(255,255,255, 0.8)',
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: 16,
                            },
                            ticks: {
                                fontColor: 'rgba(255,255,255, 0.3)',
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: 12,
                            },
                        }]
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            fontColor: '#fff',
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: 16,
                            padding: 20,
                        }
                    },
                    animation: {
                        duration: 500,
                        animateScale: false,
                        animateRotate: true
                    },
                    cutoutPercentage: 70,
                    tooltips: {
                        titleFontSize: 24,
                        bodyFontSize: 14,
                        bodyFontColor: `rgba(255, 255, 255, 0.8)`,
                        footerMarginTop: 12,
                        footerAlign: 'center',
                        footerFontSize: 20
                    },
                    elements: {
                        point: {
                            radius: 4,
                            pointStyle: 'circle',
                            borderWidth: 2,
                            borderColor: '#fff',
                            backgroundColor: '#fff',
                            hoverRadius: 10
                        },
                    },
                    pointDotRadius: 5,
                    datasetStroke: true,
                }
            }
        },
        mounted() {
            this.fillData()
        },
        methods: {
            fillData() {
                this.datacollection = {
                    labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
                    datasets: [{
                        label: 'Електро',
                        backgroundColor: `rgba(${window.chartColors.green}, .8)`,
                        borderColor: `rgba(${window.chartColors.green}, 1)`,
                        fillColor: `rgba(${window.chartColors.green}, .9)`,
                        pointBackgroundColor: "#fff",
                        data: [
                            67,
                            101,
                            647,
                            2367,
                            5211,
                            9125,
                            12570,
                            14288,
                        ]
                    }, {
                        label: 'Дизель',
                        backgroundColor: `rgba(${window.chartColors.red}, .8)`,
                        borderColor: `rgba(${window.chartColors.red}, 1)`,
                        fillColor: `rgba(${window.chartColors.red}, .9)`,
                        pointBackgroundColor: "#fff",
                        data: [
                            683822,
                            478807,
                            353210,
                            385506,
                            419662,
                            469787,
                            748985,
                            624453,
                        ]
                    }, {
                        label: 'Бензин',
                        backgroundColor: `rgba(${window.chartColors.blue}, .8)`,
                        borderColor: `rgba(${window.chartColors.blue}, 1)`,
                        fillColor: `rgba(${window.chartColors.blue}, .9)`,
                        pointBackgroundColor: "#fff",
                        data: [
                            971930,
                            661417,
                            545284,
                            551660,
                            533949,
                            554172,
                            703357,
                            797501,
                        ]
                    }]
                }
            },
        }
    }
</script>

<style lang="scss">
    .small {
        width: 50vw;
        margin: 0 auto;
        height: 70vh;
        position: relative;

        &>* {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        /* margin: 150px auto; */
    }
</style>