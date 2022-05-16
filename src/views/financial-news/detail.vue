<template>
  <div class="financial-news-details">
    <div class="title">{{ info.title }}</div>
    <el-divider />
    <div class="abstract">摘要：{{ info.abstract }}</div>
    <el-divider />
    <div class="content">{{ info.content }}</div>
    <div class="bottom">
      <span>来源：{{ info.source }}    作者：{{ info.author }}</span>
    </div>
    <el-divider />

  </div>
</template>
<script>
import { title } from '@/settings'
export default {
  data() {
    return {
      info: {
        id: 11,
        title: '4月7日 北向资金半日净流出14.74亿元',
        abstract: '4月7日，Wind数据显示，截至午间收盘，北向资金净流出14.74亿元。',
        content: '4月7日，Wind数据显示，截至午间收盘，北向资金净流出14.74亿元。其中，沪股通资金净流入1.47亿元，深股通资金净流出16.21亿元。',
        source: '中国证券报·中证网',
        author: '葛春晖'
      }
    }
  },
  created() {
    console.log(this.$route.query.id, 'ids')
  }

}
</script>

<style lang="scss" scoped>
.financial-news-details {
  padding: 24px;
  text-align: center;
  .title {
    text-align: center;
    font-size: 38px;
    line-height: 52px;
    font-weight: bold;
    margin: 52px;
  }
  .abstract {
    text-align: center;
    font-size: 18px;
    color: rgba(0,0,0,0.5);
  }
  .content {
    min-height: 200px;
    margin: 32px 0;
  }
}
</style>