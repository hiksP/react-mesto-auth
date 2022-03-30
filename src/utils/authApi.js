class AuthApi {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка ${res.status}`) 
        }
        return res.json();
    } 

    //регистрация
    signUp({email, password}) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({password, email})
        }) .then(this._getResponseData)
    }

    // авторизация
    signIn({email, password}) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({password, email})
        }) .then(this._getResponseData)
    }

    tokenCheck() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("jwt")}`
            }
        }) .then(this._getResponseData)
    }


}

export const authApi = new AuthApi({
    baseUrl: 'https://auth.nomoreparties.co'
})