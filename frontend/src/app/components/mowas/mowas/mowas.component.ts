import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FacesModel } from 'src/app/models/faces';
import { MowasModel } from 'src/app/models/mowas';
import { MowasdetailModel } from 'src/app/models/mowas-detail';
import { SeverityModel } from 'src/app/models/severity';
import { EmergencyDataService } from 'src/app/services/emergency-data.service';
import { EventBusService } from 'src/app/services/event-bus.service';
import { EventData } from 'src/app/services/event.class';
import { MarkerService } from 'src/app/services/marker.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mowas',
  templateUrl: './mowas.component.html',
  styleUrls: ['./mowas.component.scss']
})
export class MowasComponent implements OnInit {

  public mowasList: MowasModel[] = [];
  private selectedMowas: MowasModel;
  public mowasDetailsAlerts: MowasdetailModel[] = [];
  public selectedMowasDetails: MowasdetailModel[] = [];
  public bookedFaces: FacesModel[] = [];
  public mowasId: number;
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
    this.mowasId = -1;
    this.getMowas();
    this.schowMaps = false;
  }

  delEmergency(id: number) {
    window.alert("delete emergency " + id + "?");

  }

  openModal(template: TemplateRef<any>, mowas: MowasModel) {    
    //const emd: any = emergency.emergencyDetailsCollection.find(ed => ed.msgType === 'alert');    
    //this.getBookedFacesIn(template, mowas);
  }

  sort(key: string) {

  }

  /*
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
  */
  getAyudaEmergencyPath(emergencyGuId: string): string {
    return environment.ayudaUrl.concat(environment.ayudaEmergencyUrl).concat(emergencyGuId); //"80775cae-d50f-4d7d-89d5-d6847e03e701";
  }

  onSelect(mowas: MowasModel): void {
    this.selectedMowas = mowas;
    this.selectedMowasDetails = mowas.mowasDetailsCollection; //.sort((a,b) => a - b);
  }

  onSelectIndex(mowas: MowasModel, index: number): void {
    if (this.mowasId === mowas.id) {
      this.mowasId = -1;
    } else {
      this.mowasId = mowas.id;
    }
    //this.expandRow(index);
    this.onSelect(mowas);
  }

  getMowas(): void {
    this.dataService.getMowas().subscribe(
      (mowasList: MowasModel[]) => {
        mowasList.map((mowas: MowasModel) => {
          //console.log(JSON.stringify(mowas.mowasDetailsCollection[0]));
          const mwd: any = mowas.mowasDetailsCollection.find(md => md.alertMsgtypeId?.id == 1);


          if (mwd != null) {
            //console.log(JSON.stringify(mwd));
            mowas.areaDescription = mwd.areaAreadesc;
            mowas.infoSeverityId = mwd.infoSeverityId;
            mowas.effectiveTime = mwd.alertSent;
            mowas.messageHeader = mwd.infoHeadline;
            mowas.errCode = mwd.errCode;
          } else {
            mowas.areaDescription = "";
            mowas.infoSeverityId = new SeverityModel;
            mowas.messageHeader = "";
            mowas.errCode = "";
          }
          return mowas;
        });
        this.mowasList = mowasList;
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
  /*
  private getBookedFacesIn(template: TemplateRef<any>, mowas: MowasModel): void {
    const emdIds: number[] = [];
    mowas.mowasDetailsCollection.map(mw => {
      if (mw.alertMsgtypeId.msgType === 'alert') {
        emdIds.push(mw.id);
      }
    });
    //console.log("getBookedFaces emdIds: " + emdIds);
    this.dataService.getBookedFacesIn(emdIds).subscribe(
      (result: FacesModel[]) => {
        this.bookedFaces = result;
        this.modalRef = this.modalService.show(template);
        //this.initMapGeo(this.bookedFaces[0].latitude, this.bookedFaces[0].longitude);   
        this.drawMarkersOnMap(this.bookedFaces, this.bookedFaces[0].latitude, this.bookedFaces[0].longitude, this.bookedFaces[0].cityUuid.cityUuid);
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
  */
  drawMarkersOnMap(bookedFaces: FacesModel[], lat: number, lon: number, cityUuid: string) {
    this.map = this.markerService.createMap('map');
    this.markerService.delMarkers(this.map);
    this.markerService.initializeMapGeo(this.map, lat, lon);
    this.markerService.initStatesLayerGeo(this.map, cityUuid);
    this.markerService.makeFacesMarkersGeo(this.map, bookedFaces);
  }

}
