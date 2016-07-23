import {Product} from "../models/product";
import {ProductData} from "../models/productData";
import {GameDetails} from "../models/gameDetails";
import {IGetViewModelByIdDelegate, IViewModelByIdProvider} from "./viewModelProvider";
import {IProductsCoreController} from "../dataControllers/productsController";
import {IImageUriController} from "../imageUriController";
import {IScreenshotsController} from "../dataControllers/screenshotsController";

export class GameDetailsViewModel {
    id: number;
    title: string;
    slug: string;
    thumbnail: string;
    thumbnailRetina: string;
    hero: string;
    heroRetina: string;
    publisher: string;
    developer: string;
    cdKey: string;
    genres: string;
    series: string;
    requiredProducts: string;
    worksOn: string;
    dlc: string;
    screenshots: Array<string>;
    changelog: string;
    visibility: string;
}

export class GameDetailsViewModelProvider implements IViewModelByIdProvider<GameDetailsViewModel> {

    productsController: IProductsCoreController<Product>;
    productsDataController: IProductsCoreController<ProductData>;
    gameDetailsController: IProductsCoreController<GameDetails>;
    imageUriController: IImageUriController;
    screenshotsController: IScreenshotsController;

    public constructor(
        productsController: IProductsCoreController<Product>,
        gameDetailsController: IProductsCoreController<GameDetails>,
        productsDataController: IProductsCoreController<ProductData>,
        imageUriController: IImageUriController,
        screenshotsController: IScreenshotsController) {
        this.productsController = productsController;
        this.gameDetailsController = gameDetailsController;
        this.productsDataController = productsDataController;
        this.imageUriController = imageUriController;
        this.screenshotsController = screenshotsController;
    }

    private getCdKeys = (gameDetails: GameDetails): Array<string> => {
        let cdKeys = new Array<string>();

        if (gameDetails.cdKey) {
            cdKeys.push(gameDetails.title + " " + gameDetails.cdKey)
        }

        if (gameDetails.dlcs) {
            gameDetails.dlcs.forEach(dlc => {
                let dlcKeys = this.getCdKeys(dlc);
                if (dlcKeys)
                    dlcKeys.forEach(key => { cdKeys.push(key) });
            })
        }

        return cdKeys;
    }

    public getViewModelById: IGetViewModelByIdDelegate<GameDetailsViewModel> =
    (id: number): GameDetailsViewModel => {

        if (id == null) return null;

        let gdVM = new GameDetailsViewModel();

        let product = this.productsController.getById(id);

        if (!product) return null;

        let genres = new Array<string>();
        let requiredProducts = new Array<string>();
        let worksOn = new Array<string>();
        let dlcs = new Array<string>();
        let visibilityClasses = new Array<string>();

        gdVM.id = id;
        gdVM.title = product.title;
        gdVM.slug = product.slug;
        gdVM.publisher = "N/A";
        gdVM.developer = "N/A";

        var productImageUris = this.imageUriController.getProductImageUris(product.image);
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
            } else {
                gdVM.slug = ""; // if there is no product data - links would be useless
            }
        }

        if (this.gameDetailsController) {
            let gd = this.gameDetailsController.getById(id);
            if (gd) {
                let cdKey = this.getCdKeys(gd);
                gdVM.cdKey = cdKey.join("<br>");
                gdVM.changelog = gd.changelog;
            }
        }

        if (this.screenshotsController) {
            gdVM.screenshots = this.screenshotsController.getScreenshotsById(id);
        }

        ["Windows", "Mac", "Linux"].forEach(os => {
            if (product.worksOn[os]) worksOn.push(os)
        });

        gdVM.worksOn = worksOn.join(", ");
        gdVM.genres = genres.join(", ");
        gdVM.requiredProducts = requiredProducts.join(", ");
        gdVM.dlc = dlcs.join(", ");

        // visibility

        if (gdVM.genres) visibilityClasses.push("genres");
        if (gdVM.requiredProducts) visibilityClasses.push("requiredProducts");
        if (gdVM.slug) visibilityClasses.push("links");
        if (gdVM.dlc) visibilityClasses.push("dlc");
        if (gdVM.series) visibilityClasses.push("series");
        if (gdVM.cdKey) visibilityClasses.push("cdKey");
        if (gdVM.changelog) visibilityClasses.push("changelog");
        if (gdVM.screenshots !== null &&
            gdVM.screenshots.length > 0) visibilityClasses.push("screenshots");

        gdVM.visibility = visibilityClasses.join(" ");

        return gdVM;
    }
}