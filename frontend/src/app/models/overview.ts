export class OverviewModel{

    name:   string;
    uuid:   string;
    anz:    number;
    selected: boolean=false;

    constructor(name: string, uuid: string, anz: number){
        this.name = name;
        this.uuid = uuid;
        this.anz  = anz;
        this.selected=false;
    }

    
}