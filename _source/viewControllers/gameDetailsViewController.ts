import {IDetailsViewController, IShowDetailsDelegate} from "./detailsViewController";
import {GameDetails} from "../models/gameDetails"
import {Product} from "../models/product";
import {ProductData} from "../models/productData";
import {IProductsCoreController} from "../dataControllers/productsController";
import {IViewController} from "./viewController";
import {IGetIdDelegate} from "./viewController";
import {IPostProcessingController} from "../postProcessingController";

export class GameDetailsViewController implements IDetailsViewController {

    templateId: string;
    parentElement: Element;
    productsController: IProductsCoreController<Product>;
    viewController: IViewController;
    getIdDelegate: IGetIdDelegate;
    filesExpandController: IPostProcessingController;
    imagesExpandController: IPostProcessingController;
    imagesLoadController: IPostProcessingController;

    public constructor(
        getIdDelegate: IGetIdDelegate,
        templateId: string,
        parentElement: Element,
        viewController: IViewController,
        productsController: IProductsCoreController<Product>,
        filesExpandController: IPostProcessingController,
        imagesExpandController: IPostProcessingController,
        imagesLoadController: IPostProcessingController) {
        this.getIdDelegate = getIdDelegate;
        this.templateId = templateId;
        this.parentElement = parentElement;
        this.viewController = viewController;
        this.productsController = productsController;
        this.filesExpandController = filesExpandController;
        this.imagesExpandController = imagesExpandController;
        this.imagesLoadController = imagesLoadController;
    }

    public showDetails: IShowDetailsDelegate =
    function (id: number) {

        let product = this.productsController.getById(id);

        let gameDetailsView = this.viewController.createById(
            product,
            this.getIdDelegate,
            this.templateId);

        this.parentElement.innerHTML = gameDetailsView;

        // expand files
        this.filesExpandController.process(this.parentElement);
        // expand images
        this.imagesExpandController.process(this.parentElement);
        // load images
        requestAnimationFrame(() => {
            this.imagesLoadController.process(this.parentElement);
        });
    }
}