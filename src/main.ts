import '@/assets/scss/iconfont.css';
import './assets/scss/main.scss';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Lazyload } from 'vant';
const app = createApp(App);

app.use(router).use(Lazyload);

app.mount('#app');
