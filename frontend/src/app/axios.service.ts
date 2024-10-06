import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor(private tokenService: TokenStorageService) {
    axios.defaults.baseURL = environment.backendBaseUrl; //'http://localhost:9090/tocsin-gui/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }
  /*
  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }
  */

  request(method: string, url: string, data: any): Promise<any> {
      let headers: any = {};

      if (this.tokenService.getToken !== null) {
          headers = {"Authorization": "Bearer " + this.tokenService.getToken()};
          //console.log("AuthToken: " + this.getAuthToken());
      }

      return axios({
          method: method,
          url: url,
          data: data,
          headers: headers
      });
  }
}
