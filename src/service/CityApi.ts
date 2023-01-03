import axios from "./api";

class CityApi {

    getBaseUrl() {
        return process.env.VUE_APP_APIBACKEND + '/city'
    }

    searchCity(search: string | number ) {
        let url = null
        if(Number(search)) {
            url = this.getBaseUrl() + '/search?' + 'code_postale=' + search
            console.log(url)
        } else {
            url = this.getBaseUrl() + '/search?' + 'name=' + search
            console.log(url)
        }
        return axios.get(url)
    }
}

export default new CityApi()
