import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  username: string = "";

  constructor(private auth: AuthService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.username = this.tokenStorage.getUser().username;
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout() {
    //TODO
    //this.auth.logout();
    this.tokenStorage.signOut();
    this.router.navigate(["/login"])
  }
}
