import {
    Doughnut
} from 'vue-chartjs'

export default {
    extends: Doughnut,
    props: {
        chartData: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: () => {
                return {
                    responsive: true,
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    animation: {
                        duration: 500,
                        animateScale: false,
                        animateRotate: true
                    },
                    cutoutPercentage: 70,
                    tooltips: {
                        callbacks: {
                            label: (tooltipItem, data) => {
                                return `  ${data.labels[tooltipItem.index]} `
                            },
                            footer: (tooltipItem, data) => {
                                return `${data.datasets[0].data[tooltipItem[0].index]}%`
                            }
                        },
                        titleFontSize: 24,
                        bodyFontSize: 14,
                        bodyFontColor: `rgba(255, 255, 255, 0.8)`,
                        footerMarginTop: 12,
                        footerAlign: 'center',
                        footerFontSize: 20
                    }
                }
            }
        }
    },
    computed: {
        dataToWatch: function() {
            return this.chartData.datasets[0].data
        }
    },
    watch: {
        dataToWatch() {
            this.$data._chart.update()
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
    },
}