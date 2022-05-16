<template>
  <div class="financial-statistics">
    <div class="financial-statistics__content">
      <el-row :gutter="18" v-for="(item, index) in wishList" :key="item.id">
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span style="font-size: 24px">心愿：{{ item.name }}</span>
              <div style="float: right;font-size: 12px">
                  <el-button style="padding:6px" type="primary" icon="el-icon-edit" circle @click="editIt(item)"></el-button>
                  <el-button style="padding:6px" type="danger" icon="el-icon-delete" circle @click="deleteIt(item,index)"></el-button>
                </div>
            </div>
            <div class="wish-content">
              <div class="wish-content__left">
                <div class="wish-content__left__wish">
                  <span v-if="item.status === 1" class="el-icon-star-on text"></span>
                  <span v-if="item.status === 0" class="el-icon-star-off text"></span>
                  <span class="text">我的心愿：</span>
                  <span class="vaul">{{ item.name }}</span>
                </div>
                <div class="wish-content__left__target">
                  <span class="text">￥目标金额：</span>
                  <span class="vaul">{{ item.amount }}</span>
                </div>
                <div class="wish-content__left__state">
                  <span class="state">完成状态</span>
                  <el-tag v-if="item.status === 1" type="success">已完成</el-tag>
                  <el-tag v-if="item.status === 0" type="warning">未完成</el-tag>
                </div>
              </div>
              <div class="wish-content__right">
                记录时间：{{ item.time }}
              </div>
            </div>
          </el-card>
      </el-row>
    </div>
    <div class="financial-statistics__bottom">
      <el-row :gutter="18">
        <div class="add-wrapper" @click="addIt">
          <span class="el-icon-plus"></span>
          <span>创建新的心愿单</span>
        </div>
      </el-row>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="addOrEditDialog"
      width="60%"
    >
      <el-form ref="formName" :model="form">
        <el-form-item label="我的心愿" :label-width="formLabelWidth">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="目标金额" :label-width="formLabelWidth">
          <el-input v-model="form.amount" />
        </el-form-item>
        <el-form-item label="完成状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOrEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddOrEdit(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as Wish from '@/api/financial';
export default {
  data() {
    return {
      isEdit: false,
      addOrEditDialog: false,
      wishList: [],
      statusList: [
        {
          label: '未完成',
          value: 0
        },
        {
          label: '已完成',
          value: 1
        }
      ],
      form:  {},
      title: '新建心愿单',
      formLabelWidth: '80px'
    }
  },
  created() {
    this.getList();
  },
  methods: {
    // 查询列表信息
		getList() {
			Wish.wishSelect().then(res => {
        this.wishList = res.data;
			})
		},
    // 编辑按钮
    editIt(item) {
      this.isEdit = true;
      this.addOrEditDialog = true;
      this.title = '编辑心愿单';
      this.form = JSON.parse(JSON.stringify(item));
    },
    // 删除按钮
    deleteIt(item, index) {
      this.$confirm('此操作将永久删除该心愿单, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Wish.wishDelete({ id: item.id }).then(res => {
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
    // 创建按钮
    addIt() {
      this.isEdit = false;
      this.addOrEditDialog = true;
      this.title = '新建心愿单';
      this.form = {};
    },
    // 点击确定按钮
    confirmAddOrEdit(form) {
      if (this.isEdit) {
				Wish.wishUpdate(form).then(res => {
					if (res.code === 200) {
						this.getList();
					}
				})
			} else {
				Wish.wishInsert(form).then(res => {
					if (res.code === 200) {
						this.getList();
					}
				})
			}
      this.addOrEditDialog = false;
    }
  }
}
</script>
<style lang="scss">
.el-tag {
  height: 24px;
  line-height: 24px;
}
</style>
<style lang="scss" scoped>
.financial-statistics {
  padding: 0 14px;
  margin: 0 auto;
  &__content {
    padding: 0 24px;
    .el-row {
      margin-top: 14px;
      font-size: 14px;
      .wish-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__left {
          line-height: 24px;
          .text {
            color: red;
          }
          &__state {
            margin-top: 12px;
            // font-size: 14px;
            .state {
              padding-right: 12px;
            }
          }
        }
      }
    }
    max-height: 600px;
    overflow: auto;
  }
  &__content::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
  &__bottom {
    padding: 0 24px;
    .add-wrapper {
      cursor: pointer;
      margin-top: 24px;
      width: 100%;
      height: 36px;
      line-height: 36px;
      background: rgb(0, 0, 0, 0.1);
      text-align: center;
    }
  }
}
</style>