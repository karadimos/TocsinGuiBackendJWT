import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { EventBusService } from 'src/app/services/event-bus.service';
import { EventData } from 'src/app/services/event.class';
import { curEmsModel } from '../../models/cur-ems';
import { DashboardModel } from '../../models/dashboard';
import { RestdataService } from '../../services/restdata.service';
import { UtilitiesService } from '../../services/utilities.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  content?: string;
  lstBookedEMs: DashboardModel[];
  lstFailedEMs: DashboardModel[];
  lstRejectedEMs: DashboardModel[];
  numCities: number;
  numMedia: number;
  numScreens: number;
  numAllScreens: number;
  lstCurRejectedEMs: curEmsModel[];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


  constructor(private utility: UtilitiesService, private restdata: RestdataService, private eventBusService: EventBusService) { }

  ngOnInit(): void {

    this.countCities();
    this.countMedia();
    this.countScreens();
    this.countAllScreens();
    this.getBookedEMs();
    this.getCurRejectedEMs();

    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: []
      }
    };
  }
  //

  getCurRejectedEMs(): void {
    this.restdata.getCurRejectedEMs().subscribe(
      (curEMs: curEmsModel[]) => {
        //console.log("curRejectedEMs: " + JSON.stringify(curEMs));
        this.lstCurRejectedEMs = curEMs;
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

  countCities(): void {
    this.restdata.countCities().subscribe(
      (countCities: number) => {
        this.numCities = countCities;
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

  countMedia(): void {
    this.restdata.countMedia().subscribe(
      (countMedia: number) => {
        this.numMedia = countMedia;
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

  countScreens(): void {
    this.restdata.countScreens().subscribe(
      (countScreens: number) => {
        this.numScreens = countScreens;
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

  countAllScreens(): void {
    this.restdata.countAllScreens().subscribe(
      (countAllScreens: number) => {
        this.numAllScreens = countAllScreens;
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
  //

  getBookedEMs(): void {
    const union = (a: string[], b: string[]) => Array.from(new Set([...a, ...b]));
    //console.log(union(["neymar","messi"], ["ronaldo","neymar"]));    
    this.restdata.getBookedEMs().subscribe(
      (lstBookedEMs: DashboardModel[]) => {
        //console.log("lstBookedEMs: " + JSON.stringify(lstBookedEMs));
        this.lstBookedEMs = lstBookedEMs;
        this.getFailedEMs();
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

  getFailedEMs(): void {
    this.restdata.getFailedEMs().subscribe(
      (lstFailedEMs: DashboardModel[]) => {
        //console.log("lstFailedEMs: " + JSON.stringify(lstFailedEMs));
        this.lstFailedEMs = lstFailedEMs;
        this.getRejectedEMs();
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

  getRejectedEMs(): void {
    this.restdata.getRejectedEMs().subscribe(
      (lstRejectedEMs: DashboardModel[]) => {
        //console.log("lstFailedEMs: " + JSON.stringify(lstRejectedEMs));
        this.lstRejectedEMs = lstRejectedEMs;
        this.setChartData();
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

  setChartData() {
    this.chartOptions = {
      series: [
        {
          name: "Booked EMs",
          data: this.lstBookedEMs.map(a => a.anz) //[28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: "Rejected EMs",
          data: this.lstRejectedEMs.map(a => a.anz) //[12, 11, 14, 18, 17, 13, 13]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Average High & Low Temperature",
        align: "left"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        //categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        categories: this.lstBookedEMs.map(a => this.months[new Date(a.alert_date).getMonth()] + " " + new Date(a.alert_date).getFullYear()),
        title: {
          text: "Month"
        }
      },
      yaxis: {
        title: {
          text: "Temperature"
        },
        min: 5,
        max: 40
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
    /*
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: this.lstRejectedEMs.map(a => a.anz) //[10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories:  this.lstRejectedEMs.map(a => a.alert_date) //["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      }
    };
    */
  }
}
