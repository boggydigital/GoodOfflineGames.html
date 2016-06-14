import {IDetailsViewController, IShowDetailsDelegate} from "./detailsViewController";
import {GameDetails} from "../models/gameDetails"
import {Product} from "../models/product";
import {IProductsCoreController} from "../dataControllers/productsController";
import {IViewController} from "./viewController";
import {IGetIdDelegate} from "./viewController";

export class GameDetailsViewController implements IDetailsViewController {

    templateId: string;
    parentElement: Element;
    // gameDetailsController: IProductsCoreController<GameDetails>;
    productsController: IProductsCoreController<Product>;
    viewController: IViewController<Product>;
    getIdDelegate: IGetIdDelegate<Product>;

    public constructor(
        getIdDelegate: IGetIdDelegate<Product>,
        templateId: string,
        parentElement: Element,
        viewController: IViewController<Product>,
        productsController: IProductsCoreController<Product>) {
        // gameDetailsController: IProductsCoreController<GameDetails>) {
        this.getIdDelegate = getIdDelegate;
        this.templateId = templateId;
        this.parentElement = parentElement;
        this.viewController = viewController;
        // this.gameDetailsController = gameDetailsController;
        this.productsController = productsController;
    }

    public showDetails: IShowDetailsDelegate =
    function (id: number) {

        let product = this.productsController.getById(id);

        let gameDetailsView = this.viewController.create(
            product,
            this.getIdDelegate,
            this.templateId);
            
        this.parentElement.innerHTML = gameDetailsView;
    }
}