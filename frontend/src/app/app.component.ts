import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TocsinGui';
	sideBarOpen = true;
	showHead = true;
	loading$ = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
    if (this.showHead == false) {
      this.sideBarOpen = false;
    }
  }
}
