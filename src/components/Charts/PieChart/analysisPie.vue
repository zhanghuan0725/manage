<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// import resize from '../mixins/resize'

export default {
  name: 'PieChart',
  // mixins: [resize],
  props: {
    echartsData: {
      type: Object,
      default: {}
    },
    timeType: {
      type: String,
      default: 'year'
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
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  created() {
    this.$nextTick(() => {
      this.initChart()
      console.log(this.timeType)
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
        // title: [
        //     {
        //         text: this.timeType === 'year' ? '年度分析' : (this.timeType === 'month' ? '月度分析' : '每周分析'),
        //         left: '15%'
        //     }
        // ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '50%',
            data: [
                { value: this.echartsData.income_sum, name: '收入' },
                { value: this.echartsData.expenses_sum, name: '支出' }
            ],
            emphasis: {
                itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            left: '0%',
            right: '60%'
          }
        ]
      })
    }
  }
}
</script>
