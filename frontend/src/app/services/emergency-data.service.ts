import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmergencyModel } from '../models/emergency';
import { EmergencydetailModel } from '../models/emergency-detail';
import { FacesModel } from '../models/faces';
import { MowasModel } from '../models/mowas';
import { AxiosService } from '../axios.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class EmergencyDataService {

  constructor(private axios: AxiosService) { }

  headers: any = {};

  getEmergencies(): Promise<EmergencydetailModel[]> {
    return axios({
      method:"GET",
      url:"api/data/emergencies"
    });
    //return this.axios.request(
     // get<EmergencyModel[]>(environment.backendBaseUrl + "api/data/emergencies", { responseType: 'json' });
  }
  /*
  getEmergenciesByDetailUuid(uuid: string): Promise<EmergencydetailModel[]> {
    return this.http.get<EmergencydetailModel[]>(environment.backendBaseUrl + "api/data/emergencydetails/uuid/" + uuid, { responseType: 'json' });
  }

  getMowas(): Observable<MowasModel[]> {
    return this.http.get<MowasModel[]>(environment.backendBaseUrl + "api/data/mowas", { responseType: 'json' });
  }


  getBookedFacesIn(emdIds: number[]): Observable<FacesModel[]> {
    return this.http.get<FacesModel[]>(environment.backendBaseUrl + "api/data/emergencydetails/booked-faces/in/" + emdIds, { responseType: 'json' });
  }


  getBookedFaces(id: number): Observable<FacesModel[]> {
    return this.http.get<FacesModel[]>(environment.backendBaseUrl + "api/data/emergencydetails/booked-faces/" + id, { responseType: 'json' });
  }
    */
}
