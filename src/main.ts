import VueVideoPlayer from '@videojs-player/vue';
import { Popup } from 'vant';
import 'vant/lib/index.css';
import 'video.js/dist/video-js.css';
import '@/assets/scss/iconfont.css';
import './assets/scss/main.scss';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Lazyload } from 'vant';
const app = createApp(App);

app.use(router).use(Lazyload).use(VueVideoPlayer).use(Popup);

app.mount('#app');
