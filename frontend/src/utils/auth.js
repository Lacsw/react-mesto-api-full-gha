class Auth {
  constructor(options) {
    this._baseUsl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  async signup(data) {
    const response = await fetch(`${this._baseUsl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    return this._checkResponse(response);
  }

  async login(data) {
    const response = await fetch(`${this._baseUsl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    return this._checkResponse(response);
  }

  async checkAuth() {
    const response = await fetch(`${this._baseUsl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    return this._checkResponse(response);
  }

  async signout() {
    const response = await fetch(`${this._baseUsl}/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    return this._checkResponse(response);
  }
}

const auth = new Auth({
  baseUrl: 'http://mesto.api.nomoredomains.work',
});

export default auth;
