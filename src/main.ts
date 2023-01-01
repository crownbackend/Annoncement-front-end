import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css'
import ToastPlugin from 'vue-toast-notification';
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

createApp(App).use(store).use(router).use(ToastPlugin).mount('#app')
