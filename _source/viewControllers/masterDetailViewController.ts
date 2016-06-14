import {IListViewController} from "./listViewController";
import {IDetailsViewController} from "./detailsViewController";

export class MasterDetailViewController {
    
    public constructor(masterListViewController: IListViewController,
        detailsViewController: IDetailsViewController) {

        masterListViewController.addEventCallback("selectedChanged", (e) => {
            detailsViewController.showDetails(e);
        });
    }
}