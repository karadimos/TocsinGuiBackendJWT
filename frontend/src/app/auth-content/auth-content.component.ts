import { Component } from '@angular/core';
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-auth-content',
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.css']
})
export class AuthContentComponent {
  data: any;

  constructor(private axiosService: AxiosService) {}

  ngOnInit(): void {
    this.axiosService.request(
        "GET",
        "/api/media",
        {}).then(
        (response) => {
            this.data = response.data.map((a: { cityName: any; }) => a.cityName)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                this.axiosService.setAuthToken(null);
            } else {
                this.data = error.response.code;
            }
        }
    );
  }

}
