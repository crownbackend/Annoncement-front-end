import api from "@/service/api";

class AdApi {

    getBaseUrl() {
        return process.env.VUE_APP_APIBACKEND + '/ad'
    }

    searchAdCount(data: any) {
        console.log(data)
        const url = this.getBaseUrl() + '/search/count'
        return api.post(url, data)
    }

    searchAds(data: any) {
        const url = this.getBaseUrl() + '/search?category=' + data.category + '&search=' + data.search + '&city='
            + data.city + '&priceMin=' + data.priceMin + '&priceMax=' + data.priceMax + '&searchAds=' + data.searchAds
        return api.get(url)
    }
}

export default new AdApi()
