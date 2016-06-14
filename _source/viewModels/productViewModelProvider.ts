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

export class ProductViewModelProvider implements IViewModelProvider<ProductViewModel> {

    productsController: IProductsCoreController<Product>;
    ownedController: IProductsCoreController<Product>;
    gameDetailsController: IProductsCoreController<GameDetails>;
    wishlistController: ICollectionController<number>;
    productFilesController: IProductFilesController;

    public constructor(
        productsController: IProductsCoreController<Product>,
        ownedController: IProductsCoreController<Product>,
        gameDetailsController: IProductsCoreController<GameDetails>,
        productFilesController: IProductFilesController,
        wishlistController: ICollectionController<number>) {
        this.productsController = productsController;
        this.ownedController = ownedController;
        this.gameDetailsController = gameDetailsController;
        this.productFilesController = productFilesController;
        this.wishlistController = wishlistController;
    }

    public getViewModel: IGetViewModelDelegate<ProductViewModel> =
    function (id: number): ProductViewModel {

        if (id == null) return null;

        let product = this.productsController.getById(id);
        if (!product) return null;

        let productViewModel = new ProductViewModel();
        let classes = [];
        let tags = [];

        productViewModel.id = id;
        productViewModel.title = product.title;

        if (this.ownedController &&
            this.ownedController.getById(id)) {
            classes.push("owned");
            tags.push("OWNED");
        }

        if (this.productFilesController) {
            let productFilesValidated = this.productFilesController.validated(id);
            if (productFilesValidated === true) {
                classes.push("validated");
                tags.push("DATA OK");
            } else if (productFilesValidated === false) {
                classes.push("validation-issue");
                tags.push("CHECK DATA");
            }
        }

        if (this.wishlistController &&
            this.wishlistController.contains(id)) {
            classes.push("wishlisted");
            tags.push("WISHLISTED");
        }

        if (this.gameDetailsController) {
            let gd = this.gameDetailsController.getById(id);
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