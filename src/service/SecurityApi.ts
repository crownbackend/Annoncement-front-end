import axios from "./api";
import {Login} from "@/model/login";

class SecurityApi {
    getBaseUrl() {
        return process.env.VUE_APP_APIBACKEND + '/login'
    }
    login(data: Login) {
        const url = this.getBaseUrl()
        return axios.post(url, data)
    }

    logout() {
        localStorage.removeItem('user');
    }
}

export default new SecurityApi();
