import {IDetailsViewController, IShowDetailsDelegate} from "./detailsViewController";
import {GameDetails} from "../models/gameDetails"
import {Product} from "../models/product";
import {ProductData} from "../models/productData";
import {IProductsCoreController} from "../dataControllers/productsController";
import {IViewController} from "./viewController";
import {IGetIdDelegate} from "./viewController";
import {IImagesController} from "../imagesController";

export class GameDetailsViewController implements IDetailsViewController {

    templateId: string;
    parentElement: Element;
    productsController: IProductsCoreController<Product>;
    viewController: IViewController<Product>;
    getIdDelegate: IGetIdDelegate<Product>;
    imagesController: IImagesController;

    public constructor(
        getIdDelegate: IGetIdDelegate<Product>,
        templateId: string,
        parentElement: Element,
        viewController: IViewController<Product>,
        productsController: IProductsCoreController<Product>,
        imagesController: IImagesController) {
        this.getIdDelegate = getIdDelegate;
        this.templateId = templateId;
        this.parentElement = parentElement;
        this.viewController = viewController;
        this.productsController = productsController;
        this.imagesController = imagesController;
    }

    public showDetails: IShowDetailsDelegate =
    function (id: number) {

        let product = this.productsController.getById(id);

        let gameDetailsView = this.viewController.create(
            product,
            this.getIdDelegate,
            this.templateId);

        this.parentElement.innerHTML = gameDetailsView;

        // expand images
        this.imagesController.expandCollection(this.parentElement);
        // load images
        requestAnimationFrame(() => {
            this.imagesController.load(this.parentElement);
        });
    }
}