import {IDetailsViewController, IShowDetailsDelegate} from "./detailsViewController";
import {GameDetails} from "../models/gameDetails"
import {IProductsCoreController} from "../dataControllers/productsController";
import {IViewController} from "./viewController";

export class GameDetailsViewController implements IDetailsViewController {

    templateId: string;
    parentElement: Element;
    gameDetailsController: IProductsCoreController<GameDetails>;
    viewController: IViewController;

    public constructor(
        templateId: string,
        parentElement: Element,
        viewController: IViewController,
        gameDetailsController: IProductsCoreController<GameDetails>) {
        this.templateId = templateId;
        this.parentElement = parentElement;
        this.viewController = viewController;
        this.gameDetailsController = gameDetailsController;
    }

    public showDetails: IShowDetailsDelegate =
    function (id: number) {

        let gameDetails = this.gameDetailsController.getById(id);

        let gameDetailsView = this.viewController.create(gameDetails, this.templateId);
        this.parentElement.innerHTML = gameDetailsView;
    }
}