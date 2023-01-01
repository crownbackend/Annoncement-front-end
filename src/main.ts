import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from "./service/api"
import "bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css'
import ToastPlugin from 'vue-toast-notification';
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

api.interceptors.response.use(
    response => {
        if (response.status === 200 || response.status === 201) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            if (error.response.status == 401) {
                localStorage.removeItem('user')
                router.push('/connexion')
            }
            return Promise.reject(error.response);
        }
    }
);

createApp(App).use(store).use(router).use(ToastPlugin).mount('#app')
