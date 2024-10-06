import { EventEmitter, Component, Output } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  })
export class LoginFormComponent {

  constructor(private authService:AuthService, private tokenService: TokenStorageService, private router: Router) { }
  
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
		this.authService.login(
			    {
					"username": this.login,
		        	"password": this.password
				}
		    ).then(
		    response => {
		        this.tokenService.saveToken(response.data.accessToken);
		        this.router.navigate(["/home"])
		    }).catch(
		    error => {
		        this.tokenService.saveToken(null);
		        this.router.navigate(["/login"])
		    }
		);

	}

	onRegister(): void {
		this.authService.register(		    
		    {
		        "firstName": this.firstName,
		        "lastName": this.lastName,
		        "login": this.login,
		        "password": this.password
		    }).then(
		    response => {
		        this.tokenService.saveToken(response.data.token);
		        this.router.navigate(["/home"])
		    }).catch(
		    error => {
		        this.tokenService.saveToken(null);
		        this.router.navigate(["/login"])
		    }
		);
	}

}
