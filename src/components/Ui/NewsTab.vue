<template>
  <div class="table-wrapper">
    <el-table
      :data="tableList"
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="id"
        label="ID"
        width="150"
      />
      <el-table-column
        prop="time"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="title"
        label="标题"
        min-width="120"
      />
      <el-table-column
        prop="author"
        label="作者"
        width="180"
      />
      <el-table-column
        prop="importance"
        label="重要性"
        width="180"
      />
      <el-table-column
        prop="pageview"
        label="访问次数"
        width="180"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }

}
</script>
