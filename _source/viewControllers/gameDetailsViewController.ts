import {IDetailsViewController, IShowDetailsDelegate} from "./detailsViewController";
import {GameDetails} from "../models/gameDetails"
import {Product} from "../models/product";
import {ProductData} from "../models/productData";
import {IProductsCoreController} from "../dataControllers/productsController";
import {IViewController} from "./viewController";
import {IGetIdDelegate} from "./viewController";
import {IImageUriController} from "../imageUriController";
import {IPostProcessingController} from "../postProcessingController";

export class GameDetailsViewController implements IDetailsViewController {

    templateId: string;
    parentElement: Element;
    productsController: IProductsCoreController<Product>;
    viewController: IViewController<Product>;
    getIdDelegate: IGetIdDelegate<Product>;
    // imageUriController: IImageUriController;
    imageExpandController: IPostProcessingController;
    imageLoadController: IPostProcessingController;

    public constructor(
        getIdDelegate: IGetIdDelegate<Product>,
        templateId: string,
        parentElement: Element,
        viewController: IViewController<Product>,
        productsController: IProductsCoreController<Product>,
        // imageUriController: IImageUriController,
        imageExpandController: IPostProcessingController,
        imageLoadController: IPostProcessingController) {
        this.getIdDelegate = getIdDelegate;
        this.templateId = templateId;
        this.parentElement = parentElement;
        this.viewController = viewController;
        this.productsController = productsController;
        // this.imageUriController = imageUriController;
        this.imageExpandController = imageExpandController;
        this.imageLoadController = imageLoadController;
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
        this.imageExpandController.process(this.parentElement);
        // load images
        requestAnimationFrame(() => {
            this.imageLoadController.process(this.parentElement);
        });
    }
}