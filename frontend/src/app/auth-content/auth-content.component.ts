import { Component } from '@angular/core';
import { RestdataService } from '../services/restdata.service';

@Component({
  selector: 'app-auth-content',
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.css']
})
export class AuthContentComponent {
  data: any;

  constructor(private dataService: RestdataService) {}

  ngOnInit(): void {
    this.data = this.dataService.getCities();
  }

}
