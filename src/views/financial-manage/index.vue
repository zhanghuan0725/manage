<template>
  <div class="wrapper">
    <div class="content">
      <div class="top">
        <el-radio-group v-model="search.tabType" @change="tabChange">
          <el-radio-button
            v-for="item in tabList"
            :key="item.value"
            :label="item.value"
          >{{ item.name }}</el-radio-button>
        </el-radio-group>
      </div>
      <div class="searchAndNew">
        <div class="search">
          <el-date-picker
            v-model="search.time"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
          <el-input
            v-model="search.remark"
            placeholder="请输入收支备注名"
            style="width: 234px;margin-left: 24px"
          />
          <el-button style=" margin: 0 12px;" type="primary" @click="searchSubmit(search)">查询</el-button>
        </div>
        <div class="new-wrapper">
          <el-button type="primary" icon="el-icon-circle-plus" @click="newIt">新建</el-button>
        </div>
      </div>
      <el-card shadow="never">
        <FinancialTable
          :table-list="tableList"
		  :search-page="page"
          @edit-it="editIt"
          @delete-it="deleteIt"
        />
		<el-pagination
			v-show="total > 0"
			:page-size="size"
			background
			layout="prev, pager, next"
			:total="total"
			@current-change="handleCurrentChange"
		/>

		<!-- 新建/编辑收支明细 -->
        <el-dialog
          :title="title"
          :visible.sync="editDialogVisible"
          width="60%"
        >
          <el-form ref="formName" :model="form">
            <el-form-item label="金额" :label-width="formLabelWidth">
              <el-input v-model="form.amount" />
            </el-form-item>
            <el-form-item label="收支备注" :label-width="formLabelWidth">
              <el-input v-model="form.remark" />
            </el-form-item>
            <el-form-item label="收支日期" :label-width="formLabelWidth">
              <el-date-picker
                v-model="form.time"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="收支类型" :label-width="formLabelWidth">
              <el-input v-model="form.type" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAddOrEdit(form)">确 定</el-button>
          </div>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import FinancialTable from '@/components/Ui/FinancialTable.vue'
import * as Manage from '@/api/manage'
export default {
  	name: 'Dashboard',
  	components: { FinancialTable },
	data() {
		return {
				page:1,
				isEdit: false,
				editDialogVisible: false,
				tabList: [
					{
						value: 'all',
						name: '收支明细'
					},
					{
						value: 'income',
						name: '收入记账'
					},
					{
						value: 'expenses',
						name: '支出记账'
					}
				],
				// 查询参数
				search: {
					page: 1,
					tabType: 'all',
					time: '',
					remark: ''
				},
				size: 10,
				total: 0,
				// 收支table
				tableList:[],
				// dialog Title
				title: '',
				form: {},
				formLabelWidth: '80px'
		}
	},
	created() {
		this.getList();
	},
	methods: {
		// 查询列表信息
		getList() {
			Manage.manageSelect(this.search).then(res => {
				this.tableList = res.data;
				this.total = res.total;
			})
		},
		// 改变当前页数
		handleCurrentChange(val) {
			this.search.page = val
			this.page = val
			this.getList();
		},
		// 切换tab
		tabChange(value) {
			this.search.page = 1;
			this.search.tabType = value;
			this.getList();
		},
		// 查询
		searchSubmit(item) {
			this.getList();
		},
		// 新建
		newIt() {
			this.isEdit = false;
			this.form = {};
			this.title = '新建';
			this.editDialogVisible = true;
		},
		// 编辑
		editIt(val) {
			this.isEdit = true;
			this.title = '编辑'
			this.form = JSON.parse(JSON.stringify(val))
			this.editDialogVisible = true
		},
		// 删除
		deleteIt(item) {
			this.$confirm('此操作将永久删除, 是否继续?', '删除', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				Manage.manageDelete({ id: item.id }).then(res => {
					if (res.code === 200) {
						this.getList();
						this.$message({
						type: 'success',
						message: '删除成功!'
						});
					}
				})
			}).catch(() => {
				this.$message({
				type: 'info',
				message: '已取消删除'
				});
			});
		},
		// 新建/编辑--确认
		confirmAddOrEdit(form) {
			if (this.isEdit) {
				Manage.manageUpdate(form).then(res => {
					if (res.code === 200) {
						this.getList();
					}
				})
			} else {
				form.tabType = this.search.tabType;
				Manage.manageInsert(form).then(res => {
					if (res.code === 200) {
						this.getList();
					}
				})
			}

			this.editDialogVisible = false
			this.form = {}
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
