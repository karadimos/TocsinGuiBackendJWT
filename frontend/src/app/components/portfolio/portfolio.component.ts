import { Component, OnInit } from '@angular/core';
import { EventBusService } from 'src/app/services/event-bus.service';
import { EventData } from 'src/app/services/event.class';
import { FacesModel } from '../../models/faces';
import { OverviewModel } from '../../models/overview';
import { RestdataService } from '../../services/restdata.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  lstCitiesOverview: OverviewModel[] = [];
  lstMediaOverview: OverviewModel[] = [];
  lstFaces: FacesModel[] = [];
  lstFilteredFaces: FacesModel[] = [];

  reverse: boolean = false;
  p: number = 1;
  content?: string;

  constructor(private utility: UtilitiesService, private restdata: RestdataService, private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.getCitiesOverview();
    this.getMediaOverview();
    this.getActiveFaces();
  }

  sort(fieldName: string): any {
    this.reverse = !this.reverse;
    if (fieldName === "city") {
      if (this.reverse === false) {
        this.lstFilteredFaces = this.lstFilteredFaces.sort((a, b) => (a.city > b.city) ? 1 : -1);
      } else {
        this.lstFilteredFaces = this.lstFilteredFaces.sort((a, b) => (b.city > a.city) ? 1 : -1);
      }
    } else if (fieldName === "medium") {
      if (this.reverse === true) {
        this.lstFilteredFaces = this.lstFilteredFaces.sort((a, b) => (a.faceMedium > b.faceMedium) ? 1 : -1);
      } else {
        this.lstFilteredFaces = this.lstFilteredFaces.sort((a, b) => (b.faceMedium > a.faceMedium) ? 1 : -1);
      }
    }
  }

  getCitiesOverview(): void {
    this.restdata.getCitiesOverview().subscribe(
      (lstCities: OverviewModel[]) => {
        //console.log("lstCitiesOverview: " + JSON.stringify(lstCities));
        this.lstCitiesOverview = lstCities;
      },
      (err) => {
        this.utility.onError("error " + JSON.stringify(err));
        this.content = err.error.message || err.error || err.message;
        if (err.status === 403){
          this.eventBusService.emit(new EventData('logout', null));
        }
        return null;
      }
    );
  }

  getMediaOverview(): void {
    this.restdata.getMediaOverview().subscribe(
      (lstMedia: OverviewModel[]) => {
        //console.log("lstMedia: " + JSON.stringify(lstMedia));
        this.lstMediaOverview = lstMedia;
      },
      (err) => {
        this.utility.onError("error" + JSON.stringify(err));
        this.content = err.error.message || err.error || err.message;
        if (err.status === 403){
          this.eventBusService.emit(new EventData('logout', null));
        }
        return null;
      }
    );
  }

  getActiveFaces(): void {
    this.restdata.getActiveFaces().subscribe(
      (lstActiveFaces: FacesModel[]) => {
        //console.log("lstFaces: " + JSON.stringify(lstActiveFaces));
        this.lstFaces = lstActiveFaces;
        this.lstFilteredFaces = this.lstFaces;
      },
      (err) => {
        this.utility.onError("error" + JSON.stringify(err));
        this.content = err.error.message || err.error || err.message;
        if (err.status === 403){
          this.eventBusService.emit(new EventData('logout', null));
        }
        return null;
      }
    );
  }

  searchStr: any;
  search() {
    if (this.searchStr == "") {
      this.lstFilteredFaces = this.lstFaces;
    } else {
      this.lstFilteredFaces = this.lstFaces;
      this.lstFilteredFaces = this.lstFilteredFaces.filter(res => {
        return res.cityUuid.cityName.toLocaleLowerCase().match(this.searchStr.toLocaleLowerCase())
          || res.faceMediumUuid.mediaName.toLocaleLowerCase().match(this.searchStr.toLocaleLowerCase())
          || res.face.match(this.searchStr);
        //console.log(res.face + ", " + this.searchStr + ": "+ res.face.match(this.searchStr));
        //return res.face.match(this.searchStr);

      })
    }
  }

  filter() {
    let lstFilteredCities = this.lstCitiesOverview.filter(item => {
      return item.selected == true;
    }).map(item => item.uuid);
    //console.log("cities: " + JSON.stringify(lstFilteredCities));
    let lstFilteredMedia = this.lstMediaOverview.filter(item => {
      return item.selected == true;
    }).map(item => item.uuid);
    //console.log("media: " + JSON.stringify(lstFilteredMedia));
    if (lstFilteredCities.length == 0 && lstFilteredMedia.length == 0){
      this.lstFilteredFaces = this.lstFaces;
    } else if (lstFilteredCities.length != 0 && lstFilteredMedia.length == 0) {
        this.lstFilteredFaces = this.lstFaces.filter(item => {
          return lstFilteredCities.includes(item.cityUuid.cityUuid);
        })
    }else if (lstFilteredCities.length == 0 && lstFilteredMedia.length != 0) {
          this.lstFilteredFaces = this.lstFaces.filter(item => {
            return lstFilteredMedia.includes(item.faceMediumUuid.mediaUuid);
          })
    }else {
          this.lstFilteredFaces = this.lstFaces.filter(item => {
            return lstFilteredCities.includes(item.cityUuid.cityUuid) && lstFilteredMedia.includes(item.faceMediumUuid.mediaUuid);
          })
    }    
  }
}
