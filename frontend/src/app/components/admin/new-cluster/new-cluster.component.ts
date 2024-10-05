import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { BundlesModel } from 'src/app/models/bundles';
import { CitiesModel } from 'src/app/models/cities';
import { MediaModel } from 'src/app/models/media';
import { SenderGroupsModel } from 'src/app/models/sender-groups';
import { EventBusService } from 'src/app/services/event-bus.service';
import { EventData } from 'src/app/services/event.class';
import { ClusterModel } from '../../../models/cluster';
import { RestdataService } from '../../../services/restdata.service';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
  selector: 'app-new-cluster',
  templateUrl: './new-cluster.component.html',
  styleUrls: ['./new-cluster.component.scss']
})
export class NewClusterComponent implements OnInit {

  public media: MediaModel[] = [];
  public cities: CitiesModel[] = [];
  public bundles: BundlesModel[] = [];
  public senderGroups: SenderGroupsModel[] = [];
  public newCluster: ClusterModel = new ClusterModel();
  content?: string;

  constructor(private restdata: RestdataService, private utility: UtilitiesService,
    private eventBusService: EventBusService,
    private notificationService: NotificationsService) { }

  ngOnInit(): void {

    this.getCities();
    this.getMedia();
    this.getBundles();
    this.getSenderGroups();
  }

  addCluster() {
    console.log("senderGroup: " + JSON.stringify(this.newCluster.senderGroupId));
    this.restdata.addCluster(this.newCluster).subscribe(
      data => {
        console.log(data);
        this.newCluster = new ClusterModel();
        this.notificationService.success('Success', "new cluster successfully added", {
          position: ['bottom', 'right'],
          timeOut: 2000,
          animate: 'fade',
          showProgressBar: 'true'
        });
      },
      err => {
        console.log(err.message);
        this.notificationService.error('Error', err.message, {
          position: ['bottom', 'right'],
          timeOut: 2000,
          animate: 'fade',
          showProgressBar: 'true'
        });
      }
    );
  }

  getCities(): void {
    this.restdata.getCities().subscribe(
      (cities: CitiesModel[]) => {
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

  getMedia(): void {
    this.restdata.getMedia().subscribe(
      (media: MediaModel[]) => {
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

  getBundles(): void {
    this.restdata.getBundles().subscribe(
      (bundles: BundlesModel[]) => {
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

  getSenderGroups(): void {
    this.restdata.getSenderGroups().subscribe(
      (senderGroups: SenderGroupsModel[]) => {
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

}
