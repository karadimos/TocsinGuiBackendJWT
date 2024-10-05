import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { EmergencydetailModel } from 'src/app/models/emergency-detail';
import { EmergencyDataService } from 'src/app/services/emergency-data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { FacesModel } from 'src/app/models/faces';
import { MarkerService } from 'src/app/services/marker.service';
import { EventData } from 'src/app/services/event.class';
import { EventBusService } from 'src/app/services/event-bus.service';

//declare var initializeMap: any;
//declare var drawPolygonOnMap: any;
//declare var drawMarkersOnNewMap: any;

@Component({
  selector: 'app-emergencydetails',
  templateUrl: './emergencydetails.component.html',
  styleUrls: ['./emergencydetails.component.scss'] //, './../../../common/css/tables.scss', './../../../common/css/rounded_tables.scss']
})

export class EmergencydetailsComponent implements OnInit {
  @Input() emergencyDetails: EmergencydetailModel[];
  private selectedEmergencyDetail: EmergencydetailModel;
  private bookedFaces: FacesModel[];
  //private schowMaps: boolean;
  public id: number;
  //private zip;
  modalRef: BsModalRef;
  content?: string;

  public map: any;

  constructor(private modalService: BsModalService, private dataService: EmergencyDataService,
    private utility: UtilitiesService, private markerService: MarkerService, private eventBusService: EventBusService) { }

  ngOnInit() {
    //this.schowMaps = false;
  }

  openModal(template: TemplateRef<any>, emergencyDetailId: number) {
    this.getBookedFaces(template, emergencyDetailId);
  }
  /*
  private initMapDE(): void {
    this.map = this.markerService.createMap('map');
    this.markerService.initializeMapDE(this.map); 
  }
  */
  private getBookedFaces(template: TemplateRef<any>, emergencyDetailId: number): void {
    this.dataService.getBookedFaces(emergencyDetailId).subscribe(
      (result: FacesModel[]) => {
        if(result.length>0){
          this.bookedFaces = result;
          //console.log("bookedFaces: " + JSON.stringify(this.bookedFaces));
          this.modalRef = this.modalService.show(template);
          //this.initMapDE();   
          this.drawMarkersOnMap(this.bookedFaces, this.bookedFaces[0].latitude, this.bookedFaces[0].longitude, this.bookedFaces[0].cityUuid.cityUuid);
        }else{
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

  onSelect(emergencyDetail: EmergencydetailModel): void {
    //console.log("emergencydetail: " + emergencyDetail.id);
    if (this.selectedEmergencyDetail === emergencyDetail) {
      //this.selectedEmergencyDetail = ''; 
      this.id = 0;
    } else {
      this.selectedEmergencyDetail = emergencyDetail;
      this.id = emergencyDetail.id;
    }
  }

  /*
  openMap(content: any, geoData: String, geoType: number, emergencyDetailId: number) {
    this.schowMaps = !this.schowMaps;
    this.id = emergencyDetailId;
    this.modalService.show(content);
    initializeMap("mapid");
    this.getBookedFaces(emergencyDetailId);
    //this.getBookedRegion(emergencyDetailId);
  }

  
    geoModel(lat:number, lng:number) {
      lat = lat;
      lng = lng;    
    }
  
  private getBookedFaces(emergencyDetailId: number): void {
    this.dataService.getBookedFaces(emergencyDetailId).subscribe(
      (result: BookedFacesModel[]) => {
        this.bookedFaces = result;
        drawMarkersOnNewMap(this.bookedFaces);
      },
      (error: string) => {
        this.utility.onError("error" + JSON.stringify(error));
        return null;
      }
    );
  }
  
  private getBookedRegion(emergencyDetailId: number): void {
    this.dataService.getEmergencyDetail(emergencyDetailId).subscribe(
      (result: EmergencydetailModel) => {
        var emd: EmergencydetailModel = result;
        //var strPolygon: string = this.convertData(emd.geoData, emd.geoTypeId.id);
        //drawPolygonOnMap(strPolygon);
      },
      (error: string) => {
        this.utility.onError("error" + JSON.stringify(error));
        return null;
      }
    );
  }
  
  

  private getBookedFaceLocation(): string {
    var str: string = "[";
    for (var i = 0; i < this.bookedFaces.length; ++i) {
      str = str.concat("[" + this.bookedFaces[i].latitude + "," + this.bookedFaces[i].longitude + "]");
      str = str.concat(",");
      //console.log(str);
    }
    if (str.endsWith(",")) {
      str = str.substr(0, str.length - 1);
      str = str.concat("]");
    }
    return str;
  }

  convertData(geoData: String, geoType: number): any {
    var geoDataCoords = [];// = new Array();    
    if (geoType === 4 || geoType === 8) { //polygon - WKT
      if (geoData.toLowerCase().startsWith("polygon") === true) {
        geoData = geoData.toLowerCase();
        geoData = geoData.replace("polygon ((", "");
        geoData = geoData.replace("))", "");
        let geoDataArr = geoData.split(",");
        for (var i = 0; i < geoDataArr.length; i++) {
          let geoDataArrTmp = geoDataArr[i].trim().split(/\s+/);
          var geo = { lat: parseFloat(geoDataArrTmp[1]), lng: parseFloat(geoDataArrTmp[0]) };
          geoDataCoords.push(geo);
        }
      } else {
        geoData = geoData.replace(/\[/g, "");
        geoData = geoData.replace(/\]/g, "");
        let geoDataArr = geoData.split(",");
        for (var i = 0; i < geoDataArr.length; i++) {
          if (i % 2 == 0) {
            var geo = { lat: parseFloat(geoDataArr[i + 1]), lng: parseFloat(geoDataArr[i]) };
            //console.log("geo: " + geo.lat + " - " + geo.lng); 
            geoDataCoords.push(geo);
          }
        }
      }
    } else {
      if (geoType === 6) { //ZIP
        var postalCodes = [
          '01067', // Dresden
          '10405', // Berlin
          '20359', // Hamburg
        ];
        this.getZipGeoData(postalCodes, 0);
      }
    }
    return geoDataCoords;
  }


  private getZipGeoData(postalCodes: string[], map: any) {
  }
  */



}



