<template>
  <div class="financial-news">
    <el-card shadow="never">
      <el-table
        :data="newsList"
        style="width: 100%">
        <el-table-column
          label="编号"
          type="index"
          :index="indexMethods"
          width="50">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="news_title"
          label="新闻标题"
          max-width="180"
          min-width="120">
          <template slot-scope="scope">
            <span style="color: blue;cursor: pointer" @click="goToDetails(scope.row.news_url)">{{ scope.row.news_title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ttype_title"
          label="新闻类型"
          width="120">
            <template slot-scope="scope">
                <span>{{ scope.row.ttype_title }}</span>
            </template>
        </el-table-column>
        <el-table-column
        show-overflow-tooltip
          prop="ttype_title"
          label="类型链接"
          width="200"
        >
            <template slot-scope="scope">
                <span style="color: blue;cursor: pointer" @click="goToTypeUrl(scope.row.type_url)">{{ scope.row.type_url }}</span>
            </template>
        </el-table-column>
        <el-table-column
          prop="ttime"
          label="新闻时间"
          width="120">
            <template slot-scope="scope">
                <span>{{ scope.row.ttime }}</span>
            </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="更新时间"
          width="150">
            <template slot-scope="scope">
                <span>{{ scope.row.time }}</span>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="total > 0"
        :page-size="size"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>
<script>
import * as News from '@/api/financial';
export default {
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      newsList: []
    }
  },
  created() {
    this.getList();
  },
  methods: {
    // 序号
    indexMethods(index) {
      if (this.page > 1) {
        return (this.page - 1) * this.size + index + 1;
      } else {
        return (index + 1)
      }
    },
    // 查询列表信息
		getList() {
			News.newsSelect({ page: this.page }).then(res => {
        this.newsList = res.data || [];
        this.total = res.total;
        console.log(res, 'res')
			})
		},
    // 改变当前页数
		handleCurrentChange(val) {
			this.page = val
			this.getList();
		},
    // 点击查看详情
    goToDetails(url) {
      window.open(url, '_blank')
    },
    // 跳转到类型链接
    goToTypeUrl(url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.financial-news {
  padding: 24px;
}
</style>
