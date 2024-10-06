import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private utility: UtilitiesService, private tokenStorage: TokenStorageService) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserLogin(next, state.url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.tokenStorage.getToken()) {
      const userRole = this.tokenStorage.getUser().roles;
      if (userRole.includes('ROLE_SUPERADMIN')) return true;
      if (route.data['role']) { //&& route.data['role'].indexOf(userRole) === -1) {
        console.log("role: " + JSON.stringify(userRole));
        for (let i = 0; i < route.data['role'].length; i++) {
          if (userRole.includes(route.data['role'][i])) {
            // console.log("allowed!!! " + JSON.stringify(route.data));
            return true;
          }
        }
        this.utility.onError("you are not allowed - " + userRole + ": " + JSON.stringify(route.data));
        return false;
      } else {
        return true;
      }
    } else {
      this.utility.onError("you are not logged in");
      this.router.navigate(["/login"]);
    }
    return false;
  }

}

