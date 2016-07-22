import {Product} from "../models/product";
import {ProductData} from "../models/productData";
import {GameDetails} from "../models/gameDetails";
import {IGetViewModelDelegate, IViewModelProvider} from "./viewModelProvider";
import {IProductsCoreController} from "../dataControllers/productsController";
import {IImagesController} from "../imagesController";
import {IScreenshotsController} from "../dataControllers/screenshotsController";

export class GameDetailsViewModel {
    id: number;
    title: string;
    thumbnail: string;
    thumbnailRetina: string;
    hero: string;
    heroRetina: string;
    publisher: string;
    developer: string;
    genres: string;
    genresVisibility: string;
    series: string;
    seriesVisibility: string;
    requiredProducts: string;
    requiredProductsVisibility: string;
    worksOn: string;
    dlc: string;
    dlcVisibility: string;
    screenshots: Array<string>;
    screenshotsVisibility: string;
}

export class GameDetailsViewModelProvider implements IViewModelProvider<GameDetailsViewModel> {

    productsController: IProductsCoreController<Product>;
    productsDataController: IProductsCoreController<ProductData>;
    gameDetailsController: IProductsCoreController<GameDetails>;
    imagesController: IImagesController;
    screenshotsController: IScreenshotsController;

    public constructor(
        productsController: IProductsCoreController<Product>,
        gameDetailsController: IProductsCoreController<GameDetails>,
        productsDataController: IProductsCoreController<ProductData>,
        imagesController: IImagesController,
        screenshotsController: IScreenshotsController) {
        this.productsController = productsController;
        this.gameDetailsController = gameDetailsController;
        this.productsDataController = productsDataController;
        this.imagesController = imagesController;
        this.screenshotsController = screenshotsController;
    }

    public getViewModel: IGetViewModelDelegate<GameDetailsViewModel> =
    function (id: number): GameDetailsViewModel {

        if (id == null) return null;

        let gdVM = new GameDetailsViewModel();

        let product = this.productsController.getById(id);

        if (!product) return null;

        let genres = new Array<string>();
        let requiredProducts = new Array<string>();
        let worksOn = new Array<string>();
        let dlcs = new Array<string>();

        gdVM.id = id;
        gdVM.title = product.title;
        gdVM.publisher = "N/A";
        gdVM.developer = "N/A";
        gdVM.genresVisibility = "hidden";
        gdVM.seriesVisibility = "hidden";
        gdVM.requiredProductsVisibility = "hidden";
        gdVM.dlcVisibility = "hidden";
        gdVM.screenshotsVisibility = "hidden";

        var productImageUris = this.imagesController.getProductImageUris(product.image);
        gdVM.thumbnail = productImageUris.thumbnail;
        gdVM.thumbnailRetina = productImageUris.thumbnailRetina;
        gdVM.hero = productImageUris.hero;
        gdVM.heroRetina = productImageUris.heroRetina;

        if (this.productsDataController) {
            let pd = this.productsDataController.getById(id);
            if (pd) {
                if (pd.publisher) gdVM.publisher = pd.publisher.name;
                if (pd.developer) gdVM.developer = pd.developer.name;
                if (pd.genres) pd.genres.forEach(g => { genres.push(g.name) });
                if (pd.series && pd.series.id > 0) gdVM.series = pd.series.name;
                if (pd.requiredProducts) pd.requiredProducts.forEach(rp => { requiredProducts.push(rp.title) });
                if (pd.dlcs) pd.dlcs.forEach(dlc => { dlcs.push(dlc.title) });
            }
        }

        if (this.screenshotsController) {
            gdVM.screenshots = this.screenshotsController.getScreenshotsById(id);
            if (gdVM.screenshots !== null &&
                gdVM.screenshots.length) gdVM.screenshotsVisibility = "";
        }

        ["Windows", "Mac", "Linux"].forEach(os => {
            if (product.worksOn[os]) worksOn.push(os)
        });

        gdVM.worksOn = worksOn.join(", ");
        gdVM.genres = genres.join(", ");
        gdVM.requiredProducts = requiredProducts.join(", ");
        gdVM.dlc = dlcs.join(", ");

        // visibility

        if (genres.length > 0) gdVM.genresVisibility = "";
        if (requiredProducts.length > 0) gdVM.requiredProductsVisibility = "";
        if (gdVM.series) gdVM.seriesVisibility = "";
        if (dlcs.length > 0) gdVM.dlcVisibility = "";

        return gdVM;
    }
}