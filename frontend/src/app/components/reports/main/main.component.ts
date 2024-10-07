import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public reports:string[]= ["tocsin-report","warnstufen"];
  public activeListItem="";
  constructor() { }

  ngOnInit(): void {
  }

  showReport(report:string){
    this.activeListItem=report;

  }

}
