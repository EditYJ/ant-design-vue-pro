<template>
  <!-- 抽屉组件存放 主题设置内容 -->
  <div>
    <a-drawer
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      width="250px"
    >
      <template v-slot:title>
        <span class="title-main"
          ><a-icon type="highlight" />&nbsp;&nbsp;主题配置</span
        >
      </template>
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <h3>主题色</h3>
        <a-radio-group
          name="themeColor"
          :value="$route.query.navTheme || 'dark'"
          @change="e => handleSettingChange('navTheme', e.target.value)"
        >
          <a-radio value="dark">深色</a-radio>
          <a-radio value="light">浅色</a-radio>
        </a-radio-group>
        <h3>导航位置</h3>
        <a-radio-group
          name="navPosition"
          :value="$route.query.navLayout || 'left'"
          @change="e => handleSettingChange('navLayout', e.target.value)"
        >
          <a-radio value="left">左侧</a-radio>
          <a-radio value="top">顶部</a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    // 将主题信息存入router的query中
    handleSettingChange(type, value) {
      this.$router.push({
        query: { ...this.$route.query, [type]: value }
      });
    }
  }
};
</script>
<style scoped>
.handle {
  position: absolute;
  top: 300px;
  right: 250px;
  width: 48px;
  height: 48px;
  background: #1890ff;
  text-align: center;
  line-height: 48px;
  font-size: 20px;
  color: white;
  border-radius: 5px 0px 0px 5px;
}
.title-main {
  font-size: 18px;
  font-weight: bold;
}
</style>
