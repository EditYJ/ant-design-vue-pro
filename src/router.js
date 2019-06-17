import Vue from "vue";
import Router from "vue-router";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import findLast from "lodash/findLast";
import { checkAuthority, isLogin } from "./utils/auth";

import NotFound from "./views/404";
import NoAuthority from "./views/403";
import { notification } from "ant-design-vue";

Vue.use(Router);

/// 约定：
/// 1. 菜单渲染，有 'name' 字段的才会渲染到侧边栏菜单
/// 2. 菜单渲染，当 hideInMenu: true 时，隐藏相应菜单及子菜单
/// 3. 菜单渲染，当 hideChildrenInMenu: true 时，隐藏相应子菜单
/// 4. 菜单渲染，meta属性下放置对应路由的图标(icon字段)以及标题(title字段)信息
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    /// [Ⅰ级路由] /user
    {
      //用户账户相关路由
      path: "/user",
      hideInMenu: true, //是否在侧边栏菜单中隐藏
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout"),
      children: [
        {
          // 重定向
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Login")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Register")
        }
      ]
    },
    /// [Ⅰ级路由] /
    {
      path: "/",
      meta: { authority: ["user", "admin"] },
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),
      children: [
        {
          path: "/",
          redirect: "/dashboard/analysis"
        },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: { icon: "dashboard", title: "仪表盘" },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              meta: { title: "分析页" },
              component: () =>
                import(/* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis")
            }
          ]
        },
        {
          path: "/form",
          name: "form",
          meta: { icon: "form", title: "表单", authority: ["admin"] },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/form/basic-form",
              name: "basicform",
              meta: { title: "基础表单" },
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm")
            },
            {
              path: "/form/step-form",
              name: "stepform",
              hideChildrenInMenu: true,
              meta: { title: "分步表单" },
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/index"),
              children: [
                {
                  path: "/form/step-form",
                  redirect: "/form/step-form/info"
                },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/StepFormInfo")
                },
                {
                  path: "/form/step-form/confirm",
                  name: "confirm",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/StepFormConfirm")
                },
                {
                  path: "/form/step-form/result",
                  name: "result",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/StepFormResult")
                }
              ]
            }
          ]
        }
      ]
    },
    /// [Ⅰ级路由] *
    {
      path: "/403",
      name: "403",
      hideInMenu: true,
      component: NoAuthority
    },
    /// [Ⅰ级路由] *
    {
      path: "*",
      name: "404",
      hideInMenu: true,
      component: NotFound
    }
  ]
});

/// 路由守卫，利用 NProgress 插件实现简单的路由切换效果
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  // console.log(to.matched);
  // 获取最近路由的权限
  const record = findLast(to.matched, record => record.meta.authority);
  // 如果获取到权限且不符合权限要求
  if (record && !checkAuthority(record.meta.authority)) {
    if (isLogin() && to.path != "/403") {
      notification.error({
        message: "403",
        description: "你没有权限访问，亲联系管理员！"
      });
      next({
        path: "/403"
      });
    } else if (to.path != "/login") {
      next({
        path: "/login"
      });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
