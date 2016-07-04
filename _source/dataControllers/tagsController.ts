import {ProductCore} from "../models/productCore";
import {Product} from "../models/product";
import {ProductData} from "../models/productData";
import {GameDetails} from "../models/gameDetails";
import {IProductsCoreController} from "../dataControllers/productsController";
import {ICollectionController} from "../dataControllers/collectionController";
import {IProductFilesController} from "../dataControllers/productFilesController";

export interface IGetTagsDelegate {
    (id: number): Array<string>;
}

export interface ITagsController {
    getTags: IGetTagsDelegate;
}

export class TagsController implements ITagsController {

    productsDataController: IProductsCoreController<ProductData>;
    ownedController: IProductsCoreController<Product>;
    gameDetailsController: IProductsCoreController<GameDetails>;
    wishlistController: ICollectionController<number>;
    productFilesController: IProductFilesController;

    public constructor(
        productsDataController: IProductsCoreController<ProductData>,
        ownedController: IProductsCoreController<Product>,
        gameDetailsController: IProductsCoreController<GameDetails>,
        productFilesController: IProductFilesController,
        wishlistController: ICollectionController<number>) {
        this.productsDataController = productsDataController;
        this.ownedController = ownedController;
        this.gameDetailsController = gameDetailsController;
        this.productFilesController = productFilesController;
        this.wishlistController = wishlistController;
    }

    public getTags: IGetTagsDelegate =
    function (id: number): Array<string> {

        let tags: Array<string> = new Array<string>();

        if (this.productsDataController) {
            let productData = this.productsDataController.getById(id);
            if (productData &&
                productData.requiredProducts &&
                productData.requiredProducts.length) {
                tags.push("dlc");
            }
        }

        if (this.ownedController &&
            this.ownedController.getById(id)) {
            tags.push("owned");
        }

        if (this.productFilesController) {
            let productFilesValidated = this.productFilesController.validated(id);
            if (productFilesValidated === true) {
                tags.push("data_ok");
            } else if (productFilesValidated === false) {
                tags.push("check_data");
            }
        }

        if (this.wishlistController &&
            this.wishlistController.contains(id)) {
            tags.push("wishlisted");
        }

        if (this.gameDetailsController) {
            let gd = this.gameDetailsController.getById(id);
            if (gd && gd.tags && gd.tags.length) {
                for (let tt = 0; tt < gd.tags.length; tt++)
                    tags.push(gd.tags[tt].name);
            }
        }

        return tags;
    }
}