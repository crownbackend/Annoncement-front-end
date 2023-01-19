import axios from "./api";
import AuthService from "@/service/AuthService";

class MessageApi {

    getBaseUrl() {
        return process.env.VUE_APP_APIBACKEND + '/message'
    }

    getToken() {
        return AuthService.getToken().token;

    }

    readMessage(data: any) {
        const url = this.getBaseUrl() + '/read'
        return axios.post(url, data, {
            headers: {
                'Authorization': 'Bearer ' + this.getToken(),
            },
        })
    }
}

export default new MessageApi()
