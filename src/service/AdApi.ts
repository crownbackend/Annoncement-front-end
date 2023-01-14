import api from "@/service/api";

class AdApi {

    getBaseUrl() {
        return process.env.VUE_APP_APIBACKEND + '/ad'
    }

    searchAdCount(data: any) {
        const url = this.getBaseUrl() + '/search/count'
        return api.post(url, data)
    }

    searchAds(data: any, range?: string) {
        let url = '';
        if(range) {
            url = this.getBaseUrl() + '/search?category=' + data.category + '&search=' + data.search + '&city='
                + data.city + '&priceMin=' + data.priceMin + '&priceMax=' + data.priceMax +
                '&searchAds=' + data.searchAds + '&range=' + range
        } else {
             url = this.getBaseUrl() + '/search?category=' + data.category + '&search=' + data.search + '&city='
                + data.city + '&priceMin=' + data.priceMin + '&priceMax=' + data.priceMax + '&searchAds=' + data.searchAds
        }
        return api.get(url)
    }

    ad(id: any) {
        const url = this.getBaseUrl() + '/' + id
        return api.get(url)
    }

    userAdsLast(id: any) {
        const url = this.getBaseUrl() + '/' + id + '/user'
        return api.get(url)
    }
}

export default new AdApi()
