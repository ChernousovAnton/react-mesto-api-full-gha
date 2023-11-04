import {Api} from "./Api";
import {apiAuthOptions} from "./constants"

class ApiAuth extends Api {

  constructor(options) {
    super(options);
  }

  register({email, password}) {
    const body = {email, password};
    return this._apiRequest(`${this._baseUrl}/signup`, 'POST', body);
  }

  authorise({email, password}) {
    const body = {email, password};
    return this._apiRequest(`${this._baseUrl}/signin`, 'POST', body);
  }

  getContent(token) {
    const initialHeaders = JSON.parse(JSON.stringify(this._headers));
    this._headers = {
      ...this._headers,
      "Authorization": `Bearer ${token}`
    }
    const response = this._apiRequest(`${this._baseUrl}/users/me`, 'GET');
    this._headers = initialHeaders;
    return response;
  }
}

const apiAuth = new ApiAuth(apiAuthOptions);

export default apiAuth;