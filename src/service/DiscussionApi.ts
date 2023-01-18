import axios from "./api";
import AuthService from "@/service/AuthService";

class DiscussionApi {

    getBaseUrl() {
        return process.env.VUE_APP_APIBACKEND + '/discussion'
    }

    getToken() {
        return AuthService.getToken().token;

    }

    create(data: FormData) {
        const url = this.getBaseUrl() + '/create'
        return axios.post(url, data, {
            headers: {
                'Authorization': 'Bearer ' + this.getToken(),
            },
        })
    }

    meDiscussion() {
        const url = this.getBaseUrl() + '/'
        return axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + this.getToken(),
            },
        } )
    }

    delete(id: number) {
        const url = this.getBaseUrl() + '/delete/' + id
        return axios.delete(url, {
            headers: {
                'Authorization': 'Bearer ' + this.getToken(),
            },
        } )
    }
}

export default new DiscussionApi()
