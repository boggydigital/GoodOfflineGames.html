import {Product} from "../models/product";
import {ProductData} from "../models/productData";
import {IGetViewModelDelegate, IViewModelProvider} from "./viewModelProvider";
import {IProductsCoreController} from "../dataControllers/productsController";
import {IImagesController} from "../viewControllers/imagesController";

export class GameDetailsViewModel {
    id: number;
    title: string;
    productImage: string;
    productImageRetina: string;
    publisher: string;
    developer: string;
}

export class GameDetailsViewModelProvider implements IViewModelProvider<GameDetailsViewModel> {

    productsController: IProductsCoreController<Product>;
    productsDataController: IProductsCoreController<ProductData>;
    imagesController: IImagesController;

    public constructor(
        imagesController: IImagesController,
        productsController: IProductsCoreController<Product>,
        productsDataController: IProductsCoreController<ProductData>) {
        this.imagesController = imagesController;
        this.productsController = productsController;
        this.productsDataController = productsDataController;
    }

    public getViewModel: IGetViewModelDelegate<GameDetailsViewModel> =
    function (id: number): GameDetailsViewModel {

        if (id == null) return null;

        let gameDetailsViewModel = new GameDetailsViewModel();

        let product = this.productsController.getById(id);

        gameDetailsViewModel.id = id;
        gameDetailsViewModel.title = product.title;
        gameDetailsViewModel.publisher = "N/A";
        gameDetailsViewModel.developer = "N/A";

        var productImageUris = this.imagesController.getLocalUri(product.image);
        gameDetailsViewModel.productImage = productImageUris.product;
        gameDetailsViewModel.productImageRetina = productImageUris.productRetina;


        if (this.productsDataController) {
            let productData = this.productsDataController.getById(id);
            if (productData && productData.publisher) gameDetailsViewModel.publisher = productData.publisher.name;
            if (productData && productData.developer) gameDetailsViewModel.developer = productData.developer.name;
        }

        return gameDetailsViewModel;
    }
}