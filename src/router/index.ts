import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系: path => component
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

//手动的添加路由, 在 动态添加路由的时候注释掉
/* const LocalRoutes = [
  {
    path: '/main/analysis/dashboard',
    component: () => import('../views/main/analysis/dashboard/dashboard.vue')
  },
  {
    path: '/main/analysis/overview',
    component: () => import('../views/main/analysis/overview/overview.vue')
  },
  {
    path: '/main/system/role',
    component: () => import('../views/main/system/role/role.vue')
  },
  {
    path: '/main/system/user',
    component: () => import('../views/main/system/user/user.vue')
  }
]
router.addRoute('main', LocalRoutes[0])
router.addRoute('main', LocalRoutes[1]) */

// 导航守卫
// 参数: to(跳转到的位置)/from(从哪里跳转过来)
// 返回值: 返回值决定导航的路径(不返回或者返回undefined, 默认跳转)
// 举个栗子: / => /main
// to: /main from: / 返回值: /abc
router.beforeEach((to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
