<template>
  <div class="container">
    <el-button @click="initData">请求数据</el-button>
    <el-card v-loading="loadingTotal">
      <div class="card-content">加载全部</div>
    </el-card>
    <el-card v-loading="getLoadingSth('A')">
      <div class="card-content">加载A</div>
    </el-card>
    <el-card v-loading="getLoadingSth('B')">
      <div class="card-content">加载B</div>
    </el-card>
    <el-card v-loading="loading">
      <div class="card-content">加载C</div>
    </el-card>
  </div>
</template>

<script>
import loadingSth from './mixins/loadingSth';
import loading from './mixins/loading';

const loadingItems = ['A', 'B'];

export default {
  mixins: [loading, ...loadingItems.map(loadingSth)],
  computed: {
    loadingTotal() {
      return (
        this.loading || loadingItems.map(this.getLoadingSth).some((v) => !!v)
      );
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.requestDataA();
      this.requestDataB();
      this.requestDataC();
    },
    async requestDataA() {
      await this.setLoadingSth('A', this.sleep(1000));
      this.$message('A done');
    },
    async requestDataB() {
      await this.setLoadingSth('B', this.sleep(5000));
      this.$message('B done');
    },
    async requestDataC() {
      await this.setLoading(this.sleep(3000));
      this.$message('C done');
    },
    async sleep(delay) {
      await new Promise((resolve) => {
        setTimeout(() => resolve(true), delay);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  .el-card {
    flex-shrink: 0;
    margin-top: 16px;
  }
  .card-content {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
}
</style>
