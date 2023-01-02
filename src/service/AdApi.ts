class AdApi {

    getBaseUrl() {
        return process.env.VUE_APP_APIBACKEND + '/ads'
    }
}

export default new AdApi()
