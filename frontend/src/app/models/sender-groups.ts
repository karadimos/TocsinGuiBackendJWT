import { SenderModel } from "./sender";

export class SenderGroupsModel {
    id: number;
    groupName: string;
    allowedSeverityAlerts: string;
    senderCollection: SenderModel[];
}