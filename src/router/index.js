import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

// 不需要登录的路由
export const PubilshRouter = ['/home'];

const router = createRouter({
  history: createWebHashHistory(),
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
    },
 

    {
      path: '/',  // 假设这是你想要重定向的旧路径
      redirect: '/home'  // 重定向到默认路由
    },

  ],
});

router.beforeEach((to, from) => {
  // const _AT = localStorage.getItem("pkce_access_token");
  // 无需验证的路由
  // if (PubilshRouter.includes(to.path)) return true;
  // 验证路由
  // if (!_AT) {
  //   localStorage.clear();
  //   return { path: '/login' };
  // };
  return true
});


export default router
