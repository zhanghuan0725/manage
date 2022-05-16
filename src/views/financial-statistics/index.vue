<template>
  <div class="wrapper">
    <div class="top">
      <DateTab
        :tab-list="tabList"
        @tab-change="getTabType"
      />
    </div>
    <div class="searchAndNew">
      <div class="search">
        <el-date-picker
          v-if="search.tabType === 'year'"
          v-model="search.time"
          type="year"
          value-format="yyyy"
          placeholder="选择年份"
          @change="yearChange"
        />
        <el-date-picker
          v-if="search.tabType === 'month'"
          v-model="search.time"
          type="month"
          placeholder="选择月份"
          value-format="yyyy-MM"
          @change="monthChange"
        />
        <el-date-picker
          v-if="search.tabType === 'week'"
          v-model="queryParam.value"
          :format="'yyyy-MM 第' + queryParam.week + '周'"
          value-format="yyyy-M-d"
          class="inp"
          size="medium"
          type="week"
          placeholder="请选择周"
          :picker-options="{'firstDayOfWeek': ''}"
          @change="weekChange"
        />
        <el-select
          v-model="search.echartType"
          placeholder="请选择图表类型"
          style="margin-left: 12px"
          @change="changEchartype"
        >
          <el-option
            v-for="item in chartTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button style=" margin: 0 12px;" type="primary" @click="searchSubmit(search)">查询</el-button>
      </div>
    </div>
    <el-card shadow="never" v-loading="loading">
      <PieChart v-if="search.echartType === 'pie' && Object.keys(chartDataList).length > 0" :chart-data="chartDataList" />
      <LineChart v-if="search.echartType === 'line' && Object.keys(chartDataList).length > 0" :chart-data="chartDataList" />
      <BarChart v-if="search.echartType === 'bar' && Object.keys(chartDataList).length > 0" :chart-data="chartDataList" />
    </el-card>
  </div>
</template>

<script>
import * as Statistics from '@/api/financial'
import DateTab from '@/components/Ui/DateTab.vue'
import PieChart from '@/components/Charts/PieChart'
import LineChart from '@/components/Charts/LineChart'
import BarChart from '@/components/Charts/BarChart'
export default {
  components: { DateTab, PieChart, LineChart, BarChart },
  data() {
    return {
      loading: false,
      tabList: [
        {
          value: 'year',
          name: '年度统计'
        },
         {
          value: 'month',
          name: '月份统计'
        },
         {
          value: 'week',
          name: '每周统计'
        }
      ],
      chartTypeList: [
          {
              value: 'pie',
              label: '饼状图'
          },
          {
              value: 'bar',
              label: '柱状图'
          },
          {
              value: 'line',
              label: '折线图'
          }
      ],
      queryParam: {
        value: '',
        week: 5
      },
      search: {
          tabType: 'year',
          time: '2022',
          echartType: 'pie'
      },
      chartDataList: {}
    }
  },
  created() {
    this.getDay();
    this.getList();
  },
  methods: {
    // gei日期默认值
    getDefaultTime() {
      if (this.search.tabType === 'year') {
          this.search.time = '2022'
        } else if (this.search.tabType === 'month') {
          this.search.time = '2022-04'
        } else if (this.search.tabType === 'week') {
          this.search.time = this.queryParam.value
        }
    },
      // 获取列表数据
      getList() {
        let param = {
          sort: this.search.tabType,
          value: this.search.time
        }
        this.loading = true;
        Statistics.statistical(param).then(res => {
          if (this.search.echartType === 'pie') {
            this.getPieData(res.data)
          } else {
            this.getBarOrLineData(res.data)
          }
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
      },
      // 处理饼状图数据
      getPieData(data) {
        let arrIncome = [], arrExpenses = []
        data.map(item => {
          let obj = {}
          obj.name = item.sum_time
          obj.value = item.sum
          if (item.tabType === 'income') {
            arrIncome.push(obj)
          } else {
            arrExpenses.push(obj)
          }
        })
        this.chartDataList.arrIncome = JSON.parse(JSON.stringify(arrIncome))
        this.chartDataList.arrExpenses = JSON.parse(JSON.stringify(arrExpenses))
      },
       // 处理折线|柱状图数据
      getBarOrLineData(data) {
        let arrIncome = [], arrExpenses = [], xAxisData = []
        data.map(item => {
          if (item.tabType === 'income') {
            arrIncome.push(item.sum)
            xAxisData.push(item.sum_time)
          } else {
            arrExpenses.push(item.sum)
          }
        })
        this.chartDataList.xAxisData = JSON.parse(JSON.stringify(xAxisData))
        this.chartDataList.arrIncome = JSON.parse(JSON.stringify(arrIncome))
        this.chartDataList.arrExpenses = JSON.parse(JSON.stringify(arrExpenses))
      },
      // 获取当前是年度｜月份｜每周统计
      getTabType(val) {
          this.chartDataList = {}
          this.search.tabType = val;
          this.getDefaultTime(); 
          this.getList();
      },
      // 点击查询按钮
      searchSubmit(search) {
          this.getList();
      },
           // 初始化日期
    getDay() {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      const nowDay = year + '-' + month + '-' + day
      this.queryParam.week = this.getWeekInMonth(new Date(nowDay))
      this.queryParam.value = year + '-' + month + '-' + day
    },
    yearChange(val) {
      this.search.time = val
    },
    monthChange(val) {
      this.search.time = val
    },
    weekChange(val) {
      if (val) {
        const arr = val.split('-')
        this.queryParam.week = this.getWeekInMonth(new Date(val))
        this.search.time = this.queryParam.value
      }
    },
    changEchartype(val) {
      this.chartDataList = {}
      this.getList();
    },
    // 根据日期判断是月的第几周
    getWeekInMonth(t) {
      if (t === undefined || t === '' || t == null) {
        t = new Date()
      } else {
        var _t = new Date()
        _t.setYear(t.getFullYear())
        _t.setMonth(t.getMonth())
        _t.setDate(t.getDate())

        var date = _t.getDate() // 给定的日期是几号

        _t.setDate(1)
        var d = _t.getDay() // 1. 得到当前的1号是星期几。
        var fisrtWeekend = d
        if (d === 0) {
          fisrtWeekend = 1
          // 1号就是星期天
        } else {
          fisrtWeekend = 7 - d + 1 // 第一周的周未是几号
        }
        if (date <= fisrtWeekend) {
          return 1
        } else {
          return 1 + Math.ceil((date - fisrtWeekend) / 7)
        }
      }
    }
  }
}
</script>
