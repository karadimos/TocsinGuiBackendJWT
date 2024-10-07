import { AfterViewInit, Component } from '@angular/core';
import { OverviewModel } from 'src/app/models/overview';
import { MarkerService } from 'src/app/services/marker.service';
import { RestdataService } from 'src/app/services/restdata.service';
import { UtilitiesService } from '../../services/utilities.service';
import * as L from 'leaflet';
import { FacesModel } from 'src/app/models/faces';
import { EventBusService } from 'src/app/services/event-bus.service';
import { EventData } from 'src/app/services/event.class';
import { CitiesModel } from 'src/app/models/cities';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})

export class MapsComponent implements AfterViewInit {

  public lstCitiesOverview: OverviewModel[] = [];
  public lstFacesByCity: FacesModel[] = [];
  public activeListItem: string = "Frankfurt am Main";

  private lat = 50.94458443495011;
  private lon = 9.9755859375;

  constructor(private utility: UtilitiesService, private restdata: RestdataService, private markerService: MarkerService,
    private eventBusService: EventBusService) { }

  private map: any;
  private states: any;

  content?: string;

  ngAfterViewInit(): void {
    this.initMapGeo();
    this.getCitiesOverview();

    this.getActiveFacesByCity('610E994D-C929-4D22-8167-6458A23445B6', 'Frankfurt am Main');
  }

  private initMapGeo(): void {
    this.map = this.markerService.createMap('map');
    this.markerService.initializeMapGeo(this.map, this.lat, this.lon);
  }

  /*
  private initMapUS(): void {
    this.map = this.markerService.initializeMapUS(this.map);
    this.markerService.makeCapitalMarkersUS(this.map);
    
  }
  
  private initMapDE(): void {
    this.map = this.markerService.createMap('map');
    this.markerService.initializeMapDE(this.map);
  }
  */
  getCitiesOverview(): void {
    this.restdata.getCitiesOverview().subscribe(
      (lstCities: OverviewModel[]) => {
        //console.log("lstCitiesOverview: " + JSON.stringify(lstCities));
        this.lstCitiesOverview = lstCities;
      },
      (err) => {
        this.utility.onError("error " + JSON.stringify(err));
        this.content = err.error.message || err.error || err.message;
        if (err.status === 403) {
          this.eventBusService.emit(new EventData('logout', null));
        }
        return null;
      }
    );
  }

  getActiveFacesByCity(cityUuid: string, cityName: string): void {
    this.activeListItem = cityName;

    this.restdata.getActiveFacesByCity(cityUuid).subscribe(
      (lstActiveFaces: FacesModel[]) => {
        //console.log("lstFaces: " + JSON.stringify(lstActiveFaces));
        this.lstFacesByCity = lstActiveFaces;
        this.markerService.delMarkers(this.map);
        this.markerService.initializeMapGeo(this.map, this.lstFacesByCity[0].latitude, this.lstFacesByCity[0].longitude);       
        this.markerService.initStatesLayerGeo(this.map, cityUuid);
        this.markerService.makeFacesMarkersGeo(this.map, this.lstFacesByCity);
      },
      (err) => {
        this.utility.onError("error" + JSON.stringify(err));
        this.content = err.error.message || err.error || err.message;
        if (err.status === 403) {
          this.eventBusService.emit(new EventData('logout', null));
        }
        return null;
      }
    );
  }
}
