import {Product} from "../models/product";
import {ProductData} from "../models/productData";
import {GameDetails} from "../models/gameDetails";
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
    genres: string;
    genresVisible: string;
    series: string;
    seriesVisible: string;
}

export class GameDetailsViewModelProvider implements IViewModelProvider<GameDetailsViewModel> {

    productsController: IProductsCoreController<Product>;
    productsDataController: IProductsCoreController<ProductData>;
    gameDetailsController: IProductsCoreController<GameDetails>;
    imagesController: IImagesController;

    public constructor(
        imagesController: IImagesController,
        productsController: IProductsCoreController<Product>,
        gameDetailsController: IProductsCoreController<GameDetails>,
        productsDataController: IProductsCoreController<ProductData>) {
        this.imagesController = imagesController;
        this.productsController = productsController;
        this.gameDetailsController = gameDetailsController;
        this.productsDataController = productsDataController;
    }

    public getViewModel: IGetViewModelDelegate<GameDetailsViewModel> =
    function (id: number): GameDetailsViewModel {

        if (id == null) return null;

        let gameDetailsViewModel = new GameDetailsViewModel();

        let product = this.productsController.getById(id);
        let genres = new Array<string>();

        gameDetailsViewModel.id = id;
        gameDetailsViewModel.title = product.title;
        gameDetailsViewModel.publisher = "N/A";
        gameDetailsViewModel.developer = "N/A";
        gameDetailsViewModel.genres = "";
        gameDetailsViewModel.genresVisible = "hidden";
        gameDetailsViewModel.seriesVisible = "hidden";
        
        var productImageUris = this.imagesController.getLocalUri(product.image);
        gameDetailsViewModel.productImage = productImageUris.product;
        gameDetailsViewModel.productImageRetina = productImageUris.productRetina;

        if (this.productsDataController) {
            let productData = this.productsDataController.getById(id);
            if (productData) {
                if (productData.publisher) gameDetailsViewModel.publisher = productData.publisher.name;
                if (productData.developer) gameDetailsViewModel.developer = productData.developer.name;
                if (productData.genres) productData.genres.forEach(g => { genres.push(g.name) });
                if (productData.series && productData.series.id > 0) gameDetailsViewModel.series = productData.series.name;
            }
        }

        // visibility

        if (genres.length > 0) {
            gameDetailsViewModel.genres = genres.join(", ");
            gameDetailsViewModel.genresVisible = "";
        }

        if (gameDetailsViewModel.series) {
            gameDetailsViewModel.seriesVisible = "";
        }

        return gameDetailsViewModel;
    }
}