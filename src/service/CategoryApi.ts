import axios from "./api";

class CategoryApi {

    getBaseUrl() {
        return process.env.VUE_APP_APIBACKEND + '/category'
    }

    getCategories() {
        const url = this.getBaseUrl() + '/categories'
        return axios.get(url)
    }
}

export default new CategoryApi()
