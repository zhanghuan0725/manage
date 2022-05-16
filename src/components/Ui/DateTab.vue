<template>
  <div class="date-tab">
    <el-radio-group v-model="tabType" @change="tabChange">
      <el-radio-button
        v-for="item in tabList"
        :key="item.value"
        :label="item.value"
      >{{ item.name }}</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
    props: {
        tabList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            tabType: 'year'
        }
    },
    methods: {
        tabChange() {
            this.$emit('tab-change', this.tabType)
        }
    }
}
</script>
