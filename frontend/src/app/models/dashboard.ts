export class DashboardModel {

    alert_date: Date;
    anz:        number;

    constructor(alert_date:Date, anz:number){
        this.alert_date=alert_date;
        this.anz = anz;
    }
}