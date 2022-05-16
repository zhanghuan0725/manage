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
        <el-button style=" margin: 0 12px;" type="primary" @click="searchSubmit(search)">查询</el-button>
      </div>
    </div>
    <el-card shadow="never" class="analysis-content" v-loading="loading">
      <div class="top-title">
        <span>本{{ search.tabType === 'year' ? '年' : (search.tabType === 'month' ? '月' : '周') }}总收支： {{ info.all_sum }}元。其中收入占{{ (info.income_sum_percent * 100).toFixed(2) }}%，支出占{{ (info.expenses_sum_percent*100).toFixed(2) }}%。</span>
      </div>
      <div class="middle-echart">
        <PieChart v-if="Object.keys(info).length > 0" :echarts-data="info" :time-type="timeType" />
      </div>
      <div class="bottom-info">
        <div class="first">
          <span class="title">收入记录：</span>
          <span class="text">{{ info.income_len }}条----收入总额{{ info.income_sum }}元</span>
        </div>
        <div class="first">
          <span class="title">支出记录：</span>
          <span class="text">{{ info.expenses_len }}条----支出总额{{ info.expenses_sum }}元</span>
        </div>
        <div class="first">
          <span class="title">余额：</span>
          <span class="text">{{ info.remaining_sum }}元</span>
        </div>
      </div>
      <div class="analysis-content">
        <div class="title">财务分析：</div>
        <div class="text">同比上{{ search.tabType === 'year' ? '年' : (search.tabType === 'month' ? '月' : '周') }}，收入{{ info.income_sum_percent }},
          支出{{ info.expenses_sum_percent }},余额{{ info.remaining_sum }}。
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as Analysis from '@/api/financial';
import DateTab from '@/components/Ui/DateTab.vue'
import PieChart from '@/components/Charts/PieChart/analysisPie.vue'
export default {
  components: { DateTab, PieChart },
  data() {
    return {
      loading: false,
      timeType: 'year',
      tabList: [
        {
          value: 'year',
          name: '年度分析'
        },
         {
          value: 'month',
          name: '月份分析'
        },
         {
          value: 'week',
          name: '每周分析'
        }
      ],
      search: {
          tabType: 'year',
          time: '2022'
      },
      queryParam: {
        value: '',
        week: 5
      },
      info: {}
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
    // 查询列表信息
		  getList() {
        this.loading = true;
          let param = {
            sort: this.search.tabType,
            value: this.search.time
          }
          Analysis.statistical(param).then(res => {
            this.info = res.statistical;
            this.loading = false;
          }).catch(() => {
            this.loading = false;
          });
      },
      // 获取当前是年度｜月份｜每周统计
      getTabType(val) {
          this.timeType = ''
          this.search.tabType = val;
          this.timeType = val;
          this.getDefaultTime(); 
          this.getList();
      },
      // 点击查询按钮
      searchSubmit() {
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

<style lang="scss" scoped>
.analysis-content {
    .top-title {
        margin-bottom: 24px;
    }
    .bottom-info {
        .first {
            margin-bottom: 12px;
        }
    }
    .analysis-content {
        margin: 24px 0;
        color: red;
        font-size: 16px;
        font-weight: bold;
        .title {
            margin-bottom: 18px;
        }
    }
}
</style>
