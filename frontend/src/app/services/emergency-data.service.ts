import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmergencyModel } from '../models/emergency';
import { EmergencydetailModel } from '../models/emergency-detail';
import { FacesModel } from '../models/faces';
import { MowasModel } from '../models/mowas';

@Injectable({
  providedIn: 'root'
})
export class EmergencyDataService {

  constructor(private http: HttpClient) { }

  getEmergencies(): Observable<EmergencyModel[]> {
    return this.http.get<EmergencyModel[]>(environment.backendBaseUrl + "api/data/emergencies", { responseType: 'json' });
  }

  getEmergenciesByDetailUuid(uuid: string): Observable<EmergencydetailModel[]> {
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
}
