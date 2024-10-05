import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UtilitiesService } from '../../../services/utilities.service';
import { Role } from '../../../models/role';
import { User } from '../../../models/user';
import { AuthService } from 'src/app/services/auth.service';
import { EventBusService } from 'src/app/services/event-bus.service';
import { EventData } from 'src/app/services/event.class';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public rolesList: Role[];
  public signupForm !: FormGroup;

  username: null;
  email: null;
  password: null;
  isSuccessful = false;
  isSignUpFailed = false;

  errorMessage = '';
  content?: string;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private utilities: UtilitiesService,
    private eventBusService: EventBusService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    //TODO
    this.rolesList = this.getRoles();
    this.signupForm = this.formBuilder.group({
      fullname: [''],
      email: [''],
      password: [''],
      mobile: [''],
      role: ['']
    })
  }

  getRoles(): any {
    if (this.tokenStorage.getToken()) {
      const r = this.tokenStorage.getUser().roles;
      console.log(JSON.stringify(r));
      return r;
    }
  }

  signUp() {
    let user: User = new User();
    user.firstName = this.signupForm.value.fullname.split(" ")[0];
    user.lastName = this.signupForm.value.fullname.split(" ")[1];
    user.email = this.signupForm.value.email;
    user.password = this.signupForm.value.password;
    user.active = true;
    user.roles = this.signupForm.value.role;
    this.auth.register(user.firstName + " " + user.lastName, user.email, user.password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.signupForm.reset();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.content = err.error.message || err.error || err.message;
        if (err.status === 403) {
          this.eventBusService.emit(new EventData('logout', null));
        }
      }
    );
    /*
    this.restapi.signup(user)
      .subscribe(() => {
        this.utilities.onSuccess("Signup successfull !!");
        this.signupForm.reset();
        //this.router.navigate(['login']);
      }, err => {
        this.utilities.onError("Something went wrong !!" + JSON.stringify(err));
      })  
    */
  }
}
