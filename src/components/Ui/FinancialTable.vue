<template>
  <div class="table-wrapper">
    <el-table
      :data="tableList"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        :index="indexMethods"
        width="55"
      />
      <el-table-column
        prop="amount"
        label="金额"
        width="150"
      />
      <el-table-column
        prop="remark"
        label="收支备注"
        min-width="120"
      />
      <el-table-column
        prop="time"
        label="收支日期"
        width="180"
      />
      <el-table-column
        prop="type"
        label="收支类型"
        width="180"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableList: {
      type: Array,
      required: true
    },
    searchPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
    }
  },
  methods: {
    // 序号
		indexMethods(index) {
			if (this.searchPage > 1) {
				return (this.searchPage -1) * 10 + index +1;
			} else {
				return (index+1)
			}
		},
    handleEdit(item) {
      this.$emit('edit-it', item)
    },
    handleDelete(item) {
      this.$emit('delete-it', item)
    }
  }

}
</script>
