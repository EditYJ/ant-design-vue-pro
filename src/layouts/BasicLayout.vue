<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-theme-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <!-- 侧边栏 -->
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme || 'dark'"
        :trigger="null"
        collapsible
        v-model="collapsed"
      >
        <div class="logo">
          <span>Ant Design Pro</span>
        </div>
        <SiderMenu />
      </a-layout-sider>
      <!-- 主体 -->
      <a-layout>
        <!-- 头部 -->
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <!-- 内容 -->
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <!-- 底部 -->
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <setting-drawer />
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";
import SettingDrawer from "../components/SettingDrawer/index";

export default {
  data() {
    return {
      collapsed: false
    };
  },
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  }
};
</script>

<style scoped>
/* 控制侧边栏菜单伸缩按钮的样式 */
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  background: #eeeeee;
}
.logo {
  text-align: center;
  font-weight: bold;
  height: 64px;
  line-height: 64px;
  font-size: 20px;
  color: white;
  overflow: hidden;
  z-index: 10;
  /* font-family: "华文行楷"; */
}
.nav-theme-light .logo {
  color: black;
  /* font-family: "Segoe Script Bold", "Segoe Script Normal", "Segoe Script"; */
}
</style>
