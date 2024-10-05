import { CitiesModel } from "./cities";
import { MediaModel } from "./media";

export class FacesModel {
    id: number;
    face: string;
    
    //faceUuid: string;
    
    faceMediumUuid: MediaModel;
    site: string;
    
    //siteUuid: string;    
    city: string;
    
    cityUuid: CitiesModel;
    federalstate: string;
    
    //federalstateUuid: string;
    latitude: number;
    longitude: number;
    gkz: string;
    zipCode: string;
    faceMedium: string;
    faceNetwork: string;
    
    //faceNetworkUuid: string;
    canvasLayoutWidth: number;
    canvasLayoutHeight: number;
    active: boolean;
    retired: boolean;
}