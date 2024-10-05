export class CitiesModel {
    id: number;
    cityName: string;
    cityUuid: string;
    cityPolygon: string;

    constructor(cityName: string, cityUuid: string, cityPolygon: string){
        this.cityName = cityName;
        this.cityUuid = cityUuid;
        this.cityPolygon = cityPolygon;
    }
}