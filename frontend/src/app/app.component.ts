import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';
import { SpinnerService } from './services/spinner.service';
import { EventBusService } from './services/event-bus.service';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'TocsinGui';
    sideBarOpen = true;
    showHead = false;
    loading$:any;
    eventBusSub?: Subscription;
    constructor(private router: Router, private auth: AuthService, public loader: SpinnerService,
      private tokenStorageService: TokenStorageService, private eventBusService: EventBusService) {
        this.loading$ = this.loader.loading$;
      // on route change to '/login', set the variable showHead to false
      this.router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          //console.log(event['url']);
          if (event['url'] == '/' || event['url'] == '/login') {
            this.showHead = false;
          } else {
            // console.log("NU")
            this.showHead = true;
          }
        }
      });
      this.eventBusSub = this.eventBusService.on('logout', () => {
        this.logout();
      });
    }
  
    ngOnInit(): void {
      //console.log("app is onInit logging Out!");
      //TODO
      //this.auth.logout();
    }
  
    sideBarToggler() {
      this.sideBarOpen = !this.sideBarOpen;
      if (this.showHead == false) {
        this.sideBarOpen = false;
      }
    }
  
    ngOnDestroy(): void {
      if (this.eventBusSub)
        this.eventBusSub.unsubscribe();
    }
    logout(): void {
      this.tokenStorageService.signOut();
      this.router.navigate(["/login"])
      //this.isLoggedIn = false;
      //this.roles = [];
      //this.showAdminBoard = false;
      //this.showModeratorBoard = false;
    }
  
}
