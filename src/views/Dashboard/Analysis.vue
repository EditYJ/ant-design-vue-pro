<template>
  <div>
    <Chart :option="chartData" />
  </div>
</template>

<script>
import Chart from "../../components/Chart";
import { setInterval, clearInterval } from "timers";
import request from "../../utils/request";
export default {
  components: {
    Chart
  },
  data() {
    return {
      chartData: {}
    };
  },
  mounted() {
    this.getChartData();
    this.interval = setInterval(() => {
      this.getChartData();
    }, 3000);
  },
  methods: {
    getChartData() {
      request({
        url: "api/dashboard/chart",
        method: "get",
        params: { ID: 12345 }
      }).then(response => {
        this.chartData = {
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
              data: response.data
            }
          ]
        };
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style></style>
