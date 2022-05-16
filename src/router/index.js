import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/financial-manage/index'),
      meta: { title: '财务管理', icon: 'caiwuguanli' }
    }]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics',
    children: [{
      path: 'statistics',
      name: 'Statistics',
      component: () => import('@/views/financial-statistics/index'),
      meta: { title: '财务统计', icon: 'caiwutongji' }
    }]
  },
  {
    path: '/analysis',
    component: Layout,
    redirect: '/analysis',
    children: [{
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/views/financial-analysis/index'),
      meta: { title: '财务分析', icon: 'caiwufenxi' }
    }]
  },
  {
    path: '/budget',
    component: Layout,
    redirect: '/budget',
    children: [{
      path: 'budget',
      name: 'Budget',
      component: () => import('@/views/financial-budget/index'),
      meta: { title: '财务预算', icon: 'caiwuyusuan' }
    }]
  },
  {
    path: '/wishList',
    component: Layout,
    redirect: '/wishList',
    children: [{
      path: 'wishList',
      name: 'WishList',
      component: () => import('@/views/wish-list/index'),
      meta: { title: '心愿单', icon: 'xinyuandan' }
    }]
  },
  {
    path: '/news',
    component: Layout,
    redirect: '/news',
    children: [{
      path: 'news',
      name: 'News',
      component: () => import('@/views/financial-news/index'),
      meta: { title: '财务新闻', icon: 'xinwen' },
    },{
        path: 'detail',
        name: 'Detail',
        component: () => import('@/views/financial-news/detail'),
        meta: { title: '新闻详情', icon: 'xiangqing' },
        hidden: true 
      }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
