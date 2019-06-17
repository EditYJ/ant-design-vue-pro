<template>
  <div>
    <Chart :option="chartData" />
  </div>
</template>

<script>
import Chart from "../../components/Chart";
import { setInterval, clearInterval } from "timers";
import random from "lodash/random";
export default {
  components: {
    Chart
  },
  data() {
    return {
      chartData: {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      this.chartData.series[0].data = this.chartData.series[0].data.map(() =>
        random(100)
      );
      this.chartData = { ...this.chartData };
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style></style>
