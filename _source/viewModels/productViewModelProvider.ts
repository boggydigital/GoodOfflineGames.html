import {ProductCore} from "../models/productCore";
import {Product} from "../models/product";
import {GameDetails} from "../models/gameDetails";
import {IGetViewModelDelegate, IViewModelProvider} from "./viewModelProvider";
import {IProductsCoreController} from "../dataControllers/productsController";
import {ICollectionController} from "../dataControllers/collectionController";
import {IProductFilesController} from "../dataControllers/productFilesController";

export class ProductViewModel {
    id: number;
    class: string;
    tags: string;
    title: string;
}

export class GameDetailsViewModel {
    id: number;
    title: string;
}

export interface IGetProductViewModelDelegate<Input> extends IGetViewModelDelegate<Input, ProductViewModel> {
    // ...
}

export class ProductCoreViewModelProvider implements IViewModelProvider<ProductCore, ProductViewModel> {

    ownedController: IProductsCoreController<Product>;
    gameDetailsController: IProductsCoreController<GameDetails>;
    wishlistController: ICollectionController<number>;
    productFilesController: IProductFilesController;

    public constructor(
        gameDetailsController: IProductsCoreController<GameDetails>,
        ownedController: IProductsCoreController<Product>,
        wishlistController: ICollectionController<number>,
        productFilesController: IProductFilesController) {
        this.gameDetailsController = gameDetailsController;
        this.ownedController = ownedController;
        this.wishlistController = wishlistController;
        this.productFilesController = productFilesController;
    }

    public getViewModel: IGetViewModelDelegate<ProductCore, ProductViewModel> =
    function (data: ProductCore): ProductViewModel {

        if (data == null) return null;

        let productViewModel = new ProductViewModel();
        let classes = [];
        let tags = [];

        productViewModel.id = data.id;
        productViewModel.title = data.title;

        if (this.ownedController &&
            this.ownedController.getById(data.id)) {
            classes.push("owned");
            tags.push("OWNED");
        }

        if (this.productFilesController) {
            let productFilesValidated = this.productFilesController.validated(data.id);
            if (productFilesValidated === true) {
                classes.push("validated");
                tags.push("DATA OK");
            } else if (productFilesValidated === false) {
                classes.push("validation-issue");
                tags.push("CHECK DATA");
            }
        }

        if (this.wishlistController &&
            this.wishlistController.contains(data.id)) {
            classes.push("wishlisted");
            tags.push("WISHLISTED");
        }

        if (this.gameDetailsController) {
            let gd = this.gameDetailsController.getById(data.id);
            if (gd && gd.tags && gd.tags.length) {
                for (let tt = 0; tt < gd.tags.length; tt++)
                    tags.push(gd.tags[tt].name);
            }
        }

        productViewModel.class = classes.join(" ");
        productViewModel.tags = tags.join(". ");

        return productViewModel;
    }
}

export class GameDetailsViewModelProvider implements IViewModelProvider<ProductCore, GameDetailsViewModel> {

    public getViewModel: IGetViewModelDelegate<ProductCore, GameDetailsViewModel> =
    function (data: ProductCore): GameDetailsViewModel {

        if (data == null) return null;

        let gameDetailsViewModel = new GameDetailsViewModel();

        gameDetailsViewModel.id = data.id;
        gameDetailsViewModel.title = data.title;

        return gameDetailsViewModel;
    }

}