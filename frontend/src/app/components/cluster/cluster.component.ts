import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BundlesModel } from 'src/app/models/bundles';
import { CitiesModel } from 'src/app/models/cities';
import { MediaModel } from 'src/app/models/media';
import { SenderGroupsModel } from 'src/app/models/sender-groups';
import { EventBusService } from 'src/app/services/event-bus.service';
import { EventData } from 'src/app/services/event.class';
import { ClusterModel } from '../../models/cluster';
import { RestdataService } from '../../services/restdata.service';
import { UtilitiesService } from '../../services/utilities.service';
//import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.scss']
})
export class ClusterComponent implements OnInit {

  public clusterList: ClusterModel[] = [];
  public clusterFilteredList: ClusterModel[] = [];
  public media: MediaModel[] = [];
  public cities: CitiesModel[] = [];
  public bundles: BundlesModel[] = [];
  public senderGroups: SenderGroupsModel[] = [];
  public editCluster: ClusterModel;

  reverse: boolean = false;
  p: number = 1;
  content?: string;

  //modalRef?: BsModalRef;
  //public editClusterForm !: FormGroup;

  constructor(private restdata: RestdataService, private utility: UtilitiesService, 
    private formBuilder: FormBuilder, private eventBusService: EventBusService) { } //private modalService: BsModalService,

  ngOnInit(): void {

    this.getCities();
    this.getMedia();
    this.getBundles();
    this.getSenderGroups();
    this.getCluster();
  }

  useIdAsIdent(item1: { id: any; }, item2: { id: any; }) {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }
  /*
  openModal(template: TemplateRef<any>, editCluster: ClusterModel) {
    this.editCluster = editCluster;
    console.log("editCluster: " + JSON.stringify(this.editCluster));
    
    this.modalRef = this.modalService.show(template);
  }
  */
  saveCluster() {

  }

  searchStr: any;
  search() {
    if (this.searchStr == "") {
      this.clusterFilteredList = this.clusterList;
    } else {
      this.clusterFilteredList = this.clusterList;
      this.clusterFilteredList = this.clusterFilteredList.filter(res => {
        return res.cityUuid?.cityName.toLocaleLowerCase().match(this.searchStr.toLocaleLowerCase())
          || res.mediaUuid.mediaName.toLocaleLowerCase().match(this.searchStr.toLocaleLowerCase());
      })
    }
  }

  getCluster(): any {
    console.log("getCluster");
    this.restdata.getCluster().then(      
      (cluster: ClusterModel[]) => {
        console.log("cluster:" + JSON.stringify(cluster));
        this.clusterList = cluster.sort(function (itemA, itemB) {
          return itemA.cityUuid?.cityName.localeCompare(itemB.cityUuid?.cityName, undefined, { numeric: false, sensitivity: 'base' });
        });
        this.clusterFilteredList = cluster;
      }).catch(
        (err) => {
          console.log("error: " + JSON.stringify(err));
          this.utility.onError("Error in getCluster: " + JSON.stringify(err));
          this.content = err.error.message || err.error || err.message;
          if (err.status === 403) {
            this.eventBusService.emit(new EventData('logout', null));
          }
          return null;
        }
    );
  }

  getCities(): any {
    this.restdata.getCities().then(
      (cities: CitiesModel[]) => {
        //console.log("cities: " + cities);
        this.cities = cities.sort(function (itemA, itemB) {
          return itemA.cityName.localeCompare(itemB.cityName, undefined, { numeric: false, sensitivity: 'base' });
        });
      },
      (err) => {
        this.utility.onError("Error in getCities: " + JSON.stringify(err));
        this.content = err.error.message || err.error || err.message;
        if (err.status === 403) {
          this.eventBusService.emit(new EventData('logout', null));
        }
        return null;
      }
    );
  }

  getMedia(): any {
    this.restdata.getMedia().then(
      (media: MediaModel[]) => {
        //console.log("media: " + JSON.stringify(media));    
        this.media = media.sort(function (itemA, itemB) {
          return itemA.mediaName.localeCompare(itemB.mediaName, undefined, { numeric: false, sensitivity: 'base' });
        });
      },
      (err) => {
        this.utility.onError("Error in getMedia: " + JSON.stringify(err));
        this.content = err.error.message || err.error || err.message;
        if (err.status === 403) {
          this.eventBusService.emit(new EventData('logout', null));
        }
        return null;
      }
    );
  }
  
  getBundles(): any {
    this.restdata.getBundles().then(
      (bundles: BundlesModel[]) => {
        //console.log("bundles: " + bundles);
        this.bundles = bundles.sort(function (itemA, itemB) {
          return itemA.bundleName.localeCompare(itemB.bundleName, undefined, { numeric: false, sensitivity: 'base' });
        });
      },
      (err) => {
        this.utility.onError("Error in getBundles: " + JSON.stringify(err));
        this.content = err.error.message || err.error || err.message;
        if (err.status === 403) {
          this.eventBusService.emit(new EventData('logout', null));
        }
        return null;
      }
    );
  }

  getSenderGroups(): any {
    this.restdata.getSenderGroups().then(
      (senderGroups: SenderGroupsModel[]) => {
        //console.log("senderGroups: " + senderGroups);
        this.senderGroups = senderGroups.sort(function (itemA, itemB) {
          return itemA.groupName.localeCompare(itemB.groupName, undefined, { numeric: false, sensitivity: 'base' });
        });
      },
      (err) => {
        this.utility.onError("Error in getBundles: " + JSON.stringify(err));
        this.content = err.error.message || err.error || err.message;
        if (err.status === 403) {
          this.eventBusService.emit(new EventData('logout', null));
        }
        return null;
      }
    );
  }
   
  sort(fieldName: string): any {
    this.reverse = !this.reverse;
    //console.log("fieldName: " + fieldName);
    if (fieldName === "city") {
      if (this.reverse === false) {
        this.clusterList = this.clusterList.sort((a, b) => (a.cityUuid?.cityName > b.cityUuid?.cityName) ? 1 : -1);
      } else {
        this.clusterList = this.clusterList.sort((a, b) => (b.cityUuid?.cityName > a.cityUuid?.cityName) ? 1 : -1);
      }
    } else if (fieldName === "medium")
      if (this.reverse === true) {
        this.clusterList = this.clusterList.sort((a, b) => (a.mediaUuid.mediaName > b.mediaUuid.mediaName) ? 1 : -1);
      } else {
        this.clusterList = this.clusterList.sort((a, b) => (b.mediaUuid.mediaName > a.mediaUuid.mediaName) ? 1 : -1);
      }
  }
}
