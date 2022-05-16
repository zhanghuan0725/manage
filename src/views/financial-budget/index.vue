<template>
  <div class="financial-budget" v-loading="loading">
    <div class="top-wrapper">
		<div class="top-wrapper-left">
			<div class="text">月度账单</div>
			<div class="value">{{ this.time }}月</div>
		</div>
		<div class="top-wrapper-right">
			<div class="income">
				<div class="text">收入（元）</div>
				<div class="value">{{ info.income_sum }}</div>
			</div>
			<div class="pay">
				<div class="text">支出（元）</div>
				<div class="value">{{ info.expenses_sum }}</div>
			</div>
			<div class="balance">
				<div class="text">结余（元）</div>
				<div class="value">{{ info.remaining_sum }}</div>
			</div>
		</div>
    </div>
	<el-divider />
	<div class="middle-content">
		<div class="middle-content-left">
			<div class="middle-left-top">预算{{ budget }}元</div>
			<div class="middle-left-bottom">
				<PieChart v-if="Object.keys(info).length > 0" :echarts-data="info" :time-type="tabType" />
			</div>
		</div>
		<div class="middle-content-right">
			<div class="middle-right-top">
				<el-button type="primary"  icon="el-icon-setting" circle @click="changeBudget"></el-button>
				<!-- <el-button type="danger" icon="el-icon-delete" circle></el-button> -->
			</div>
			<div class="middle-right-bottom">
				<el-progress :text-inside="true" :stroke-width="28" :percentage="Number(info.expenses_sum_percent) * 100"></el-progress>
				<div class="text">消费{{ info.expenses_sum }}元，  占{{ info.expenses_sum_percent * 100 || 0}}%</div>
				<el-progress :text-inside="true" :stroke-width="28" :percentage="Number((info.remaining_sum  / info.all_sum)).toFixed(2)" status="exception"></el-progress>
				<div class="text">剩余{{ info.remaining_sum }}元， 占{{ (info.remaining_sum  / info.all_sum).toFixed(2) || 0}}%</div>
			</div>
		</div>
	</div>
	<el-divider />
	<div class="bottom-content">
		<div class="bottom-content-left">
			<div class="text">收入排行榜TOP3</div>
			<div class="value" v-for="(item, index) in incomeList" :key="(item.type+index)">
				<div class="text">{{ item.remark }}：{{ item.amount }}</div>
				<el-progress style="margin: 6px 0" :text-inside="true" :stroke-width="20" :percentage="Number((item.amount * 100 / info.income_sum)).toFixed(2)"></el-progress>
			</div>
		</div>
		<div class="bottom-content-right">
			<div class="text">支出排行榜TOP3</div>
			<div class="value" v-for="(item, index) in payList" :key="(item.type+index)">
				<div class="text">{{ item.remark }}：{{ item.amount }}</div>
				<el-progress style="margin: 6px 0" :text-inside="true" :stroke-width="20" :percentage="Number((item.amount * 100 / info.expenses_sum)).toFixed(2)"></el-progress>
			</div>
		</div>
	</div>
	<el-dialog
		title="修改预算"
		:visible.sync="dialogVisible"
		width="30%"
		>
			<el-input v-model="budgetValue" />
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="confirmChange">确 定</el-button>
		</span>
		</el-dialog>
  </div>
</template>
<script>
import * as Budget from '@/api/financial';
import PieChart from '@/components/Charts/PieChart/analysisPie.vue'
export default {
	components: { PieChart },
	data() {
		return {
			dialogVisible: false,
			loading: false,
			time: '',
			tabType: 'month',
			info: {},
			budget: JSON.parse(sessionStorage.getItem('budgetValue')) ? JSON.parse(sessionStorage.getItem('budgetValue')) : 3000,
			budgetValue: 0,
			incomeList: [],
			payList: []
		}
	},
	created() {
		this.getMonth();
		this.getList();
	},
	methods: {
		// 获取当前月
		getMonth() {
		var date = new Date()
		var year = date.getFullYear()
		var month = date.getMonth() + 1
		var day = date.getDate()
		if (month < 10) {
			month = '0' + month
		}
		this.time = year + '-' + month 
		},
		// 查询列表信息
		getList() {
			this.loading = true;
			let param = {
				sort: 'month',
				value: this.time
			}
			Budget.budget(param).then(res => {
				this.info = res.statistical;
				this.payList = res.statistical.expenses_top3;
				this.incomeList = res.statistical.income_top3;
				// this.info = res.statistical;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 点击设置 修改预算
		changeBudget() {
			this.dialogVisible = true;
			this.budgetValue = this.budget;
		},
		// 点击确定
		confirmChange() {
			this.dialogVisible = false;
			sessionStorage.budgetValue = this.budgetValue;
			this.budget = this.budgetValue;
		}
	}
}
</script>

<style lang="scss" scoped>
.financial-budget {
	padding: 24px;
	.top-wrapper {
		display: flex;
		.value {
			margin-top: 12px;
		}
		.top-wrapper-left {
			margin-top: -12px;
			width: 30%;
			font-size: 20px;
			font-weight: bold;

		}
		.top-wrapper-right {
			margin-top: 12px;
			width: 60%;
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			flex-wrap: wrap;
		}
	}
	.middle-content {
		display: flex;
		.middle-content-left {
			width: 65%;
			.middle-left-top {
				color: red;
				font-size: 18px;
			}
			.middle-left-bottom {
				margin-top: 48px;
			}
		}
		.middle-content-right {
			width: 35%;
			.middle-right-top {
				margin-left: 62%;
			}
			.middle-right-bottom {
				width: 80%;
				margin-top: 32px;
				.text {
					margin: 12px 0;
				}
			}
		}
	}
	.bottom-content {
		display: flex;
		.bottom-content-left, .bottom-content-right {
			width: 50%;
		}
		.text {
			margin-bottom: 8px;
		}
		.value {
			width: 80%;
		}
	}
}
</style>
