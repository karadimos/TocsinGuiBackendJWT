import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClusterModel } from '../models/cluster';
import { OverviewModel } from '../models/overview';
import { FacesModel } from '../models/faces';
import { DashboardModel } from '../models/dashboard';
import { curEmsModel } from '../models/cur-ems';
import { BundlesModel } from '../models/bundles';
import { MediaModel } from '../models/media';
import { CitiesModel } from '../models/cities';
import { SenderGroupsModel } from '../models/sender-groups';

@Injectable({
  providedIn: 'root'
})
export class RestdataService {

  public baseUrl = environment.backendBaseUrl;

  constructor(private http: HttpClient) { }

  addCluster(cluster: ClusterModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/add-cluster', cluster);
  }

  getCurRejectedEMs(): Observable<curEmsModel[]> {
    return this.http.get<curEmsModel[]>(this.baseUrl + "api/dashboard/rejected-cur-ems", { responseType: 'json' });
  }

  countCities(): Observable<number> {
    return this.http.get<number>(this.baseUrl + "api/dashboard/count-cities", { responseType: 'json' });

  }

  countMedia(): Observable<number> {
    return this.http.get<number>(this.baseUrl + "api/dashboard/count-media", { responseType: 'json' });
  }

  countScreens(): Observable<number> {
    return this.http.get<number>(this.baseUrl + "api/dashboard/count-screens", { responseType: 'json' });
  }

  countAllScreens(): Observable<number> {
    return this.http.get<number>(this.baseUrl + "api/dashboard/count-all-screens", { responseType: 'json' });
  }

  getCluster(): Observable<ClusterModel[]> {
    return this.http.get<ClusterModel[]>(this.baseUrl + "api/cluster", { responseType: 'json' });
  }

  getCities(): Observable<CitiesModel[]> {
    return this.http.get<CitiesModel[]>(this.baseUrl + "api/cities", { responseType: 'json' });
  }

  getMedia(): Observable<MediaModel[]> {
    return this.http.get<MediaModel[]>(this.baseUrl + "api/media", { responseType: 'json' });
  }

  getBundles(): Observable<BundlesModel[]> {
    return this.http.get<BundlesModel[]>(this.baseUrl + "api/bundles", { responseType: 'json' });
  }

  getSenderGroups(): Observable<SenderGroupsModel[]> {
    return this.http.get<SenderGroupsModel[]>(this.baseUrl + "api/data/sender-groups", { responseType: 'json' });
  }

  getCitiesOverview(): Observable<OverviewModel[]> {
    return this.http.get<OverviewModel[]>(this.baseUrl + "api/cities-overview", { responseType: 'json' });
  }

  getMediaOverview(): Observable<OverviewModel[]> {
    return this.http.get<OverviewModel[]>(this.baseUrl + "api/media-overview", { responseType: 'json' });
  }

  getActiveFaces(): Observable<FacesModel[]> {
    return this.http.get<FacesModel[]>(this.baseUrl + "api/active-faces", { responseType: 'json' });
  }

  getActiveFacesByCity(cityUuid: string): Observable<FacesModel[]> {
    return this.http.get<FacesModel[]>(this.baseUrl + "api/active-faces/" + cityUuid, { responseType: 'json' });
  }

  getCity(cityUuid: string): Observable<CitiesModel> {
    return this.http.get<CitiesModel>(this.baseUrl + "api/city/" + cityUuid, { responseType: 'json' });
  }

  getBookedEMs(): Observable<DashboardModel[]> {
    return this.http.get<DashboardModel[]>(this.baseUrl + "api/dashboard/booked-ems", { responseType: 'json' });
  }

  getFailedEMs(): Observable<DashboardModel[]> {
    return this.http.get<DashboardModel[]>(this.baseUrl + "api/dashboard/failed-ems", { responseType: 'json' });
  }

  getRejectedEMs(): Observable<DashboardModel[]> {
    return this.http.get<DashboardModel[]>(this.baseUrl + "api/dashboard/rejected-ems", { responseType: 'json' });
  }

}
