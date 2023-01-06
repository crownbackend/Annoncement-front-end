import api from "@/service/api";

class AdApi {

    getBaseUrl() {
        return process.env.VUE_APP_APIBACKEND + '/ad'
    }

    searchAdCount(data: any) {
        const url = this.getBaseUrl() + '/search/count'
        return api.post(url, data)
    }
}

export default new AdApi()
