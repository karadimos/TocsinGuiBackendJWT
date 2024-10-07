import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EmergencydetailModel } from 'src/app/models/emergency-detail';
import { FacesModel } from 'src/app/models/faces';
import { MowasdetailModel } from 'src/app/models/mowas-detail';
import { EmergencyDataService } from 'src/app/services/emergency-data.service';
import { EventBusService } from 'src/app/services/event-bus.service';
import { EventData } from 'src/app/services/event.class';
import { MarkerService } from 'src/app/services/marker.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-mowasdetails',
  templateUrl: './mowasdetails.component.html',
  styleUrls: ['./mowasdetails.component.scss']
})
export class MowasdetailsComponent implements OnInit {

  @Input() mowasDetails: MowasdetailModel[];
  private selectedMowasDetail: MowasdetailModel;
  public selectedEmergencyDetails: EmergencydetailModel[];
  private bookedFaces: FacesModel[];
  public mowasDetailId: number;
  public selectedDetailUuid: string;

  //private zip;
  modalRef: BsModalRef;
  content?: string;

  public map: any;

  constructor(private modalService: BsModalService, private dataService: EmergencyDataService,
    private utility: UtilitiesService, private markerService: MarkerService, private eventBusService: EventBusService) { }

  ngOnInit() {
    //this.schowMaps = false;
  }

  openModal(template: TemplateRef<any>, mowasDetailId: number) {
    this.getBookedFaces(template, mowasDetailId);
  }
  /*
  private initMapDE(): void {
    this.map = this.markerService.createMap('map');
    this.markerService.initializeMapDE(this.map); 
  }
  */
  private getBookedFaces(template: TemplateRef<any>, mowasDetailId: number): void {
    this.dataService.getBookedFaces(mowasDetailId).subscribe(
      (result: FacesModel[]) => {
        if (result.length > 0) {
          this.bookedFaces = result;
          //console.log("bookedFaces: " + JSON.stringify(this.bookedFaces));
          this.modalRef = this.modalService.show(template);
          //this.initMapDE();   
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

  onSelect(mowasDetail: MowasdetailModel): void {
    //console.log("mowasdetail: " + mowasDetail.id);
    if (this.selectedMowasDetail === mowasDetail) {
      //this.selectedMowasDetail = ''; 
      this.selectedDetailUuid = "";
      this.mowasDetailId = 0;
    } else {
      this.selectedMowasDetail = mowasDetail;
      this.selectedDetailUuid = mowasDetail.msgProviderDetailUuid;
      this.mowasDetailId = mowasDetail.id;
      this.getEmergencyDetails();
    }
  }

  getEmergencyDetails(): void {
    //console.log("uuid selected: " + this.selectedDetailUuid);
    this.dataService.getEmergenciesByDetailUuid(this.selectedDetailUuid).subscribe(
      (res: EmergencydetailModel[]) => {
        this.selectedEmergencyDetails = res;
      });
  }



}
