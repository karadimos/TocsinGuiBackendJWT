import { EventEmitter, Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  })
export class LoginFormComponent {

  constructor(private auth:AuthService, private tokenStorage: TokenStorageService, private router: Router) { }
  
	active: string = "login";
  	firstName: string = "";
  	lastName: string = "";
  	login: string = "";
  	password: string = "";
	  isLoggedIn = false;
	  isLoginFailed = false;
	  errorMessage = '';
	  roles: string[] = [];

	  ngOnInit(): void {
		if (this.tokenStorage.getToken()) {
		  this.isLoggedIn = true;
		  this.roles = this.tokenStorage.getUser().roles;
		}
	  }

	onLoginTab(): void {
		this.active = "login";
	}

	onRegisterTab(): void {
		this.active = "register";
	}

  onLogin(): void {
	this.auth.login(this.login, this.password).subscribe(
		data => {
		  //console.log("logged in!!");
		  this.tokenStorage.saveToken(data.accessToken);
		  this.tokenStorage.saveRefreshToken(data.refreshToken);
		  this.tokenStorage.saveUser(data);
  
		  this.isLoginFailed = false;
		  this.isLoggedIn = true;
		  this.roles = this.tokenStorage.getUser().roles;
		  this.router.navigate(["/home"])
		},
		err => {
		  this.errorMessage = err.error.message;
		  this.isLoginFailed = true;
		  this.isLoggedIn = false;
		}
	  );

	}

	onRegister(): void {
		this.auth.register(this.login, "admin@admin.de", this.firstName, this.lastName, this.password).subscribe(
			data => {
			  //console.log("logged in!!");
			  this.tokenStorage.saveToken(data.accessToken);
			  this.tokenStorage.saveRefreshToken(data.refreshToken);
			  this.tokenStorage.saveUser(data);
	  
			  this.isLoginFailed = false;
			  this.isLoggedIn = true;
			  this.roles = this.tokenStorage.getUser().roles;
			  this.router.navigate(["/home"])
			},
			err => {
			  this.errorMessage = err.error.message;
			  this.isLoginFailed = true;
			  this.isLoggedIn = false;
			}
		  );
	}

}
