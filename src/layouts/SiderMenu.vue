<template>
  <div style="width: 200px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="
            () => this.$router.push({ path: item.path, query: $route.query })
          "
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
/*
 * recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
 * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
 * */
import SubMenu from "./SubMenu";
export default {
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  components: {
    "sub-menu": SubMenu
  },
  data() {
    this.openKeysMap = {}; //存放可打开的key
    this.selectedKeysMap = {}; //存放可选择的key
    const menuData = this.getMenuData(this.$router.options.routes);
    console.log(menuData);
    return {
      collapsed: false,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
      menuData
    };
  },
  watch: {
    "$route.path": function(value) {
      this.selectedKeys = this.selectedKeysMap[value];
      // 菜单关闭的时候openKeys应该是空的
      this.openKeys = this.collapsed ? [] : this.openKeysMap[value];
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    /// 处理路由表信息，输出需要显示的菜单项(递归)
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      // 处理每一个父节点
      routes.forEach(element => {
        //如果此节点有 name 且 此节点的 hideInMenu不为 true 的时候，显示此节点
        if (element.name && !element.hideInMenu) {
          this.openKeysMap[element.path] = parentKeys;
          this.selectedKeysMap[element.path] = [selectedKey || element.path];

          const newItem = { ...element };
          delete newItem.children;
          // 如果此父节点拥有子节点且父节点的hideChildrenInMenu不为true的时候，继续递归遍历子节点
          if (element.children && !element.hideChildrenInMenu) {
            newItem.children = this.getMenuData(element.children, [
              ...parentKeys,
              element.path
            ]);
          } else {
            this.getMenuData(
              element.children,
              selectedKey ? parentKeys : [...parentKeys, element.path],
              selectedKey || element.path
            );
          }
          menuData.push(newItem);
          // 找到那些没有name的，但是不隐藏自身和孩子节点的父节点进行递归，不进行显示
          // 主要是为了遍历根节点 '/'
        } else if (
          !element.hideInMenu &&
          !element.hideChildrenInMenu &&
          element.children
        ) {
          menuData.push(
            ...this.getMenuData(element.children, [...parentKeys, element.path])
          );
        }
      });
      return menuData;
    }
  }
};
</script>
