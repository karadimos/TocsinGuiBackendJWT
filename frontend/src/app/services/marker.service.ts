import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { FacesModel } from '../models/faces';
import { RestdataService } from './restdata.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  private tilesUrl: any;
  //private lat = 50.94458443495011;
  //private lon = 9.9755859375;
  private states: any;

  //shapesDE: string = 'assets/files/landkreise_Frankfurt.geojson';

  constructor(private restService: RestdataService) { }

  createMap(mapId: string): L.Map {
    return new L.Map(mapId);
  }

  initializeMapGeo(map: L.Map, lat: number, lon: number): any {
    this.tilesUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(this.tilesUrl, {
      maxZoom: 18,
      minZoom: 5,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    map.setView(new L.LatLng(lat, lon), 6);
    tiles.addTo(map);
  }

  makeFacesMarkersGeo(map: L.Map, lstFaces: FacesModel[]): void {
    //this.delMarkers();

    for (const face of lstFaces) {
      const lat = face.latitude;
      const lon = face.longitude;

      const marker = L.marker([lat, lon]);
      marker.bindPopup(this.makeFacesPopup(face));
      marker.addTo(map);
    }
  }

  makeFacesPopup(data: FacesModel): string {
    return `` +
      `<div>Site: ${data.site}</div>` +
      `<div>Face: ${data.face}</div>` +
      `<div>Medium: ${data.faceMedium}</div>`
  }

  delMarkers(map: L.Map) {
    map.eachLayer((layer: L.Layer) => {
      map.removeLayer(layer);
    });
  }
  /*
  getStateShapesGeo(cityShape: string) {
    return this.http.get(cityShape);
  }
  */
  initStatesLayerGeo(map: L.Map, cityUuid: string) {
    this.restService.getCity(cityUuid).subscribe(city => {
      this.states = '{"type": "FeatureCollection", "features": [{"type": "Feature","properties": {},	' +
        '"geometry": {"type": "Polygon",	"coordinates": [' +
        city.cityPolygon +
        ']}}]}';
        //console.log(this.states);
     // this.states = '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[7.3663330078125,51.57365561973001],[7.393798828125,51.47796179607121],[7.6025390625,51.4163381064004],[7.723388671875,51.515579783755928],[7.640991210937501,51.60778325682619],[7.3663330078125,51.57365561973001]]]}}]}';
      //console.log(this.states);
      const stateLayer = L.geoJSON(JSON.parse(this.states), {
        style: (feature) => ({
          weight: 5,
          opacity: 0.8,
          color: 'blue', //'#008f68',
          fillOpacity: 0,
          fillColor: 'yellow' //'#6DB65B'
        })
      });
      map.addLayer(stateLayer);
    });
  }
}
