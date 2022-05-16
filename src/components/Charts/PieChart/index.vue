<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// import resize from '../mixins/resize'

export default {
  // mixins: [resize],
  props: {
    chartData: {
      type: Object,
      required: true
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: [
            // {
            //     text: '年度统计',
            //     left: 'center'
            // },
            {
                subtext: '收入',
                left: '29%',
                top: '5%'
            },
            {
                subtext: '支出',
                left: '74%',
                top: '5%'
            }
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '50%',
            data: this.chartData.arrIncome,
            emphasis: {
                itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            left: '10%',
            right: '50%',
            top: '10%'
          },
          {
            name: '',
            type: 'pie',
            radius: '50%',
            data: this.chartData.arrExpenses,
            emphasis: {
                itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            left: '50%',
            right: 0,
            top: '10%'
          }
        ]
      })
    }
  }
}
</script>
