import { GeoTypeModel } from "./geo-type";
import { MsgTypeModel } from "./msg-type";
import { SeverityModel } from "./severity";


export class MowasdetailModel {
    id: number;
    alertIdentifier: string;
    alertSent: Date;
    areaAreaDesc: string;
    areaGeoData: string;
    areaGeoTypeId: GeoTypeModel;

    infoDescription: string;
    infoHeadline: string;
    infoInstruction: string;
    infoSeverityId: SeverityModel;
    alertCodeId: number;
    alertMsgtypeId: MsgTypeModel;

    areaAreadesc: string;
    areaGeoDataList: GeoTypeModel[];
    errNumber: number;
    errCode: string;

    msgProviderDetailUuid: string;

}