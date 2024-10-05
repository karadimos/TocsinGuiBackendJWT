import { BundlesModel } from "./bundles";
import { CitiesModel } from "./cities";
import { MediaModel } from "./media";
import { SenderGroupsModel } from "./sender-groups";

export class ClusterModel {
    active: boolean;
    files_dir: string;
    allScreensInCluster: boolean;
    ignoreMinorSeverityAlerts: boolean;
    provider: string; //Mowas
    email: string; //obsolete
    cluster: string;
    senderGroupId: SenderGroupsModel;

    bundleId: BundlesModel;

    cityUuid: CitiesModel;

    mediaUuid: MediaModel;

}