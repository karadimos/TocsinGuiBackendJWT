import { EmergencydetailModel } from './emergency-detail';
import { EventTypeModel } from './event-type';
import { SeverityModel } from './severity';

export class EmergencyModel {
    id:number;
    mowasRefId: number;  // *TO-DELETE
    //katwarnRefId: number; *TO-DELETE
    //providerId: string; *TO-DELETE
    //eventTypeId: EventType;  *TO-DELETE
    //advertiserName: string; *TO-DELETE
    //advertiserUuid: string; *TO-DELETE  
    senderId: string; 
    senderName: string;    
    msgProviderUuid: string;           
    //EmergencyDetailsInfos
    severityId: SeverityModel;
    effectiveTime: Date;
    messageHeader: string;
    errCode: string;
    areaDescription: string;
    emergencyDetailsCollection: EmergencydetailModel[];
}
