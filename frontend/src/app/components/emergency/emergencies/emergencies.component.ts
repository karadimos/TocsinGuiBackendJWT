import { Component, OnInit, TemplateRef } from '@angular/core';
import { EmergencyModel } from 'src/app/models/emergency';
import { EmergencyDataService } from 'src/app/services/emergency-data.service';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EmergencydetailModel } from 'src/app/models/emergency-detail';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { MarkerService } from 'src/app/services/marker.service';
import { FacesModel } from 'src/app/models/faces';
import { SeverityModel } from 'src/app/models/severity';
import { EventBusService } from 'src/app/services/event-bus.service';
import { EventData } from 'src/app/services/event.class';

@Component({
  selector: 'app-emergencies',
  templateUrl: './emergencies.component.html',
  styleUrls: ['./emergencies.component.scss']
})
export class EmergenciesComponent implements OnInit {

  //private expandedIndex: number;
  public emergencies: EmergencyModel[] = [];
  private selectedEmergency: EmergencyModel;
  public emergencyDetailsAlerts: EmergencydetailModel[] = [];
  public selectedEmergencyDetails: EmergencydetailModel[] = [];
  public bookedFaces: FacesModel[] = [];
  public emergencyId: number;
  private schowMaps: boolean;
  modalRef?: BsModalRef;

  public map: any;

  public key = 'city';
  public reverse: boolean = false;
  public p: number = 1;
  content?: string;

  constructor(private dataService: EmergencyDataService, private modalService: BsModalService, private utility: UtilitiesService,
    private markerService: MarkerService, private eventBusService: EventBusService) { }

  ngOnInit() {
    //this.expandedIndex = -1;
    this.emergencyId = -1;
    this.getEmergencies();
    this.schowMaps = false;
  }

  delEmergency(id: number) {
    window.alert("delete emergency " + id + "?");

  }

  openModal(template: TemplateRef<any>, emergency: EmergencyModel) {
    //const emd: any = emergency.emergencyDetailsCollection.find(ed => ed.msgType === 'alert');    
    this.getBookedFacesIn(template, emergency);
  }
  /*
  private initMapDE(): void {
    this.map = this.markerService.createMap('map');
    this.markerService.initializeMapDE(this.map);
  }
  
  private initMapGeo(lat: number, lon: number): void {
    this.map = this.markerService.createMap('map');
    this.markerService.initializeMapGeo(this.map, lat, lon);
  }
  */
  sort(key: string) {
    this.reverse = !this.reverse;
    if (key === "id") {
      if (this.reverse === false) {
        this.emergencies = this.emergencies.sort((a, b) => (a.id > b.id) ? 1 : -1);
      } else {
        this.emergencies = this.emergencies.sort((a, b) => (b.id > a.id) ? 1 : -1);
      }
    } else if (key === "severity") {
      if (this.reverse === true) {
        this.emergencies = this.emergencies.sort((a, b) => (a.severityId.severity > b.severityId.severity) ? 1 : -1);
      } else {
        this.emergencies = this.emergencies.sort((a, b) => (b.severityId.severity > a.severityId.severity) ? 1 : -1);
      }
    } else if (key === "effectiveTime") {
      if (this.reverse === true) {
        this.emergencies = this.emergencies.sort((a, b) => (a.effectiveTime > b.effectiveTime) ? 1 : -1);
      } else {
        this.emergencies = this.emergencies.sort((a, b) => (b.effectiveTime > a.effectiveTime) ? 1 : -1);
      }
    } else if (key === "messageHeader") {
      if (this.reverse === true) {
        this.emergencies = this.emergencies.sort((a, b) => (a.messageHeader > b.messageHeader) ? 1 : -1);
      } else {
        this.emergencies = this.emergencies.sort((a, b) => (b.messageHeader > a.messageHeader) ? 1 : -1);
      }
    } else if (key === "errCode") {
      if (this.reverse === true) {
        this.emergencies = this.emergencies.sort((a, b) => (a.errCode > b.errCode) ? 1 : -1);
      } else {
        this.emergencies = this.emergencies.sort((a, b) => (b.errCode > a.errCode) ? 1 : -1);
      }
    }
  }

  getAyudaEmergencyPath(emergencyGuId: string): string {
    return environment.ayudaUrl.concat(environment.ayudaEmergencyUrl).concat(emergencyGuId); //"80775cae-d50f-4d7d-89d5-d6847e03e701";
  }

  onSelect(emergency: EmergencyModel): void {
    this.selectedEmergency = emergency;
    this.selectedEmergencyDetails = emergency.emergencyDetailsCollection; //.sort(a,b);
  }

  onSelectIndex(emergency: EmergencyModel, index: number): void {
    if (this.emergencyId === emergency.id) {
      this.emergencyId = -1;
    } else {
      this.emergencyId = emergency.id;
    }
    //this.expandRow(index);
    this.onSelect(emergency);
  }

  getEmergencies(): void {
    this.dataService.getEmergencies().subscribe(
      (emergencies: EmergencyModel[]) => {
        emergencies.map((emergency: EmergencyModel) => {
          const emd: any = emergency.emergencyDetailsCollection.find(ed => ed.msgType === 'alert');
          //console.log(emd); 

          if (emd != null) {
            if (emergency.id == 8) {
              //console.log(JSON.stringify(emergency));
              //console.log("emd: " + JSON.stringify(emd));
            }
            emergency.areaDescription = emd.areaDescription;
            emergency.severityId = emd.severityId;
            emergency.effectiveTime = emd.effectiveTime;
            emergency.messageHeader = emd.messageHeader;
            emergency.errCode = emd.errCode;
          } else {
            emergency.areaDescription = "";
            emergency.severityId = new SeverityModel;
            //emergency.effectiveTime = new Date(Date.now());
            emergency.messageHeader = "";
            emergency.errCode = "";
          }
          return emergency;
        });
        this.emergencies = emergencies;
        //emergencies.forEach((emergency: EmergencyModel) => 
        //  console.log(emergency)
        //)                
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

  private getBookedFacesIn(template: TemplateRef<any>, emergency: EmergencyModel): void {
    const emdIds: number[] = [];
    emergency.emergencyDetailsCollection.map(ed => {
      if (ed.msgType === 'alert') {
        emdIds.push(ed.id);
      }
    });
    //console.log("getBookedFaces emdIds: " + emdIds);
    this.dataService.getBookedFacesIn(emdIds).subscribe(
      (result: FacesModel[]) => {
        if (result.length > 0) {
          this.bookedFaces = result;
          this.modalRef = this.modalService.show(template);
          //this.initMapGeo(this.bookedFaces[0].latitude, this.bookedFaces[0].longitude);   
          this.drawMarkersOnMap(this.bookedFaces, this.bookedFaces[0].latitude, this.bookedFaces[0].longitude, this.bookedFaces[0].cityUuid.cityUuid);
        } else {
          alert("no faces booked!");
        }
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

  drawMarkersOnMap(bookedFaces: FacesModel[], lat: number, lon: number, cityUuid: string) {
    this.map = this.markerService.createMap('map');
    this.markerService.delMarkers(this.map);
    this.markerService.initializeMapGeo(this.map, lat, lon);
    this.markerService.initStatesLayerGeo(this.map, cityUuid);
    this.markerService.makeFacesMarkersGeo(this.map, bookedFaces);
  }
}
