<template>
  <div ref="chartDom" style="height: 400px"></div>
</template>

<script>
import echarts from "echarts";
import { addListener, removeListener } from "resize-detector";
import debounce from "lodash/debounce";
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    option(val) {
      this.chart.setOption(val);
    }
    // 深度监听
    // opetion:{
    //   handler(val){
    //     this.chart.setOption(val)
    //   },
    //   deep:true
    // }
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    addListener(this.$refs.chartDom, this.resize);
    this.createChart();
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      console.log("重置尺寸");
      this.chart.resize();
    },
    createChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    }
  }
};
</script>

<style></style>
