import Vue from 'vue';

import 'normalize.css';
import '@/commons/styles/global.scss';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './routes';
import i18n from '@/commons/i18n';

import App from './App.vue';

Vue.use(ElementUI);

const appOptions = {
  i18n,
  router,
  render: (h) => h(App),
};
new Vue(appOptions).$mount('#app');
