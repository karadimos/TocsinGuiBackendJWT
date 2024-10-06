import { MowasdetailModel } from './mowas-detail';
import { EventTypeModel } from './event-type';
import { SeverityModel } from './severity';

export class MowasModel {
    id:number;
    alertIdentifier:string;
    alertSender: string;
    alertSent: Date;
    alertStatusId: number;
    alertScopeId: number;
    infoLanguageId: number;
    infoCategoryId: number;
    infoEventId: number;
    infoUrgencyId: number;
    infoCertaintyId: number;
    //areaAreadesc: string; //obsolete
    created: Date;
    infoSeverityId: SeverityModel;
    effectiveTime: Date;
    messageHeader: string;
    errCode: string;
    areaDescription: string;
    mowasDetailsCollection: MowasdetailModel[];
}
