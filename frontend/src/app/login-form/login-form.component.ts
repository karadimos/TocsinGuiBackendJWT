import { EventEmitter, Component, Output } from '@angular/core';
import { AxiosService } from '../axios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  })
export class LoginFormComponent {

  constructor(private axiosService: AxiosService, private router: Router) { }
  
active: string = "login";
  firstName: string = "";
  lastName: string = "";
  login: string = "";
  password: string = "";

	onLoginTab(): void {
		this.active = "login";
	}

	onRegisterTab(): void {
		this.active = "register";
	}

  onLogin(): void {
		this.axiosService.request(
		    "POST",
		    "/auth/signin",
		    {
		        username: this.login,
		        password: this.password
		    }).then(
		    response => {
		        this.axiosService.setAuthToken(response.data.accessToken);
		        this.router.navigate(["/home"])
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.router.navigate(["/login"])
		    }
		);

	}

	onRegister(): void {
		this.axiosService.request(
		    "POST",
		    "/auth/signup",
		    {
		        firstName: this.firstName,
		        lastName: this.lastName,
		        login: this.login,
		        password: this.password
		    }).then(
		    response => {
		        this.axiosService.setAuthToken(response.data.token);
		        this.router.navigate(["/home"])
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.router.navigate(["/login"])
		    }
		);
	}

}
