import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';
import axios from 'axios';

//const AUTH_API = environment.backendBaseUrl;
let headers: any = {};


@Injectable({
  providedIn: 'root'
})
export class AuthService {	
  constructor(private tokenService: TokenStorageService) {
	axios.defaults.baseURL = environment.backendBaseUrl; //'http://localhost:9090/tocsin-gui/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
   }
   
	headers: {'Content-Type': 'application/json'};
	/*
	if (this.tokenService.getToken() !== null) {
		//	headers = {"Authorization": "Bearer " + this.tokenService.getAuthToken};
			//console.log("AuthToken: " + this.getAuthToken());
		}
	*/
	//headers = {"Authorization": "Bearer " + this.getAuthToken()};

  login(input: any): Promise<any> {
	console.log("login data: " + JSON.stringify(input));
;	return axios({
		method:"POST",
		url:"auth/signin",
		data:{
			username: input.username,
			password: input.password
		},
		headers:headers
	});
	}

	register(input: any): Promise<any> {
		return axios({
			method:"POST",
			url:"auth/signup",
			data:{
				firstName: input.firstName,
		        lastName: input.lastName,
		        username: input.login,
		        password: input.password
			},
			headers:headers
		});
	}

	/*
		this.axiosService.request(
		    "POST",
		    "auth/signin",
		    {
		        username: input.login,
		        password: input.password
		    }).then(
		    response => {
		        this.tokenService.saveToken(response.data.accessToken);
		    }).catch(
		    error => {
		        this.tokenService.saveToken(null);
		    }
		);
	}
	
	register(input: any): void {
		this.axiosService.request(
		    "POST",
		    "auth/signup",
		    {
		        firstName: input.firstName,
		        lastName: input.lastName,
		        login: input.login,
		        password: input.password
		    }).then(
		    response => {
		        this.tokenService.saveToken(response.data.token);
		    }).catch(
		    error => {
		        this.tokenService.saveToken(null);
		    }
		);
	}
  
  refreshToken(token: string): void {
		this.axiosService.request(
		    "POST",
		    "auth/refreshtoken",
		    {
          refreshToken: token
		    }).then(
		    response => {
		        this.tokenService.saveRefreshToken(response.data.accessToken);
		    }).catch(
		    error => {
		        this.tokenService.saveToken(null);
		    }
		);
	}
		*/
}
