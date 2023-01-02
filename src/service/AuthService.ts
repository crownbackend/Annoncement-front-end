class AuthService {
    getUser() {
        const token = this.getToken();
        if (Object.keys(token).length === 0) {
            return false;
        }
        return true;
    }

    getInfosUser() {
        const token = this.getToken()
        return token.email
    }

    getToken() {
        return JSON.parse(localStorage.getItem('user') || '{}');
    }

    logOut() {
        localStorage.removeItem('user');
    }

    getAdmin() {
        if(this.getToken()) {
            const token = this.getToken()
            return token.role.includes('ROLE_ADMIN');
        }
        return false
    }
}

export default new AuthService()
