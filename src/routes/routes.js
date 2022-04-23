export const routes = [
  {
    name: 'ControlForm',
    path: 'control',
    component: () => import('@/views/Control/index.vue'),
    meta: {
      label: '受控表单',
    },
  },
  {
    name: 'LoadingState',
    path: 'loading-state',
    component: () => import('@/views/Loading/index.vue'),
    meta: {
      label: '加载状态',
    },
  },
  {
    name: 'VModel',
    path: 'v-model',
    component: () => import('@/views/VModel/index.vue'),
    meta: {
      label: '双向绑定',
    },
  },
];

export default [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/Home.vue'),
    children: routes,
  },
];
