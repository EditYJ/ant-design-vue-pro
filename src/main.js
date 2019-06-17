import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Notification
} from "ant-design-vue";
import Authoritied from "./components/Authoritied";
import Auth from "./directives/auth";

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Auth);
Vue.use(Notification);
Vue.component("Authoritied", Authoritied);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
