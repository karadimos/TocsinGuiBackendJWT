import { GeoTypeModel } from './geo-type';
import { EmergencyModel } from './emergency';
import { SeverityModel } from './severity';
import { ClusterModel } from './cluster';

export class EmergencydetailModel {
    id:number;
    emergencyRefId: EmergencyModel;
    msgType: string;        
    effectiveTime: number;    
    clusterId: ClusterModel;
    //expires: number; TO-DELETE
    created: string;
    isoverridingloop: boolean;
    overrideLoopStart: Date;
    overrideLoopEnd: Date;
    isappendingloop: boolean;
    appendloopStart: Date;
    appendloopEnd: Date;
    errCode: string;
    messageHeader: string;
    messageBody: string;    
    web: string;
    severityId: SeverityModel;
    //geoTypeId: number; TO-DELETE
    //geoData: string; TO-DELETE
    areaGeoDataList: GeoTypeModel[];
    detailRefId: number;
    areaDescription: string;
    msgProviderDetailUuid: string;
}


