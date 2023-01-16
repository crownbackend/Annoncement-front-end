import axios from "./api";
import AuthService from "@/service/AuthService";

class UserApi {
    getBaseUrl() {
        return process.env.VUE_APP_APIBACKEND + '/profile'
    }
    getToken() {
        return AuthService.getToken().token;

    }
    isConnected() {
        const url = this.getBaseUrl() + '/is/connected'
        return axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + this.getToken(),
            },
        })
    }
}

export default new UserApi()
