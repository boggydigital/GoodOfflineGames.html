import {ProductCore} from "../models/productCore";
import {Product} from "../models/product";
import {ProductData} from "../models/productData";
import {GameDetails} from "../models/gameDetails";
import {IProductsCoreController} from "../dataControllers/productsController";
import {ICollectionController} from "../dataControllers/collectionController";
import {IProductFilesController} from "../dataControllers/productsController";

export interface IGetTagsDelegate {
    (id: number): Array<string>;
}

export interface IGetAllTagsDelegate {
    (): Array<string>;
}

export interface ITagsController {
    getTags: IGetTagsDelegate;
    getAllTags: IGetAllTagsDelegate;
}

export class TagsController implements ITagsController {

    productsDataController: IProductsCoreController<ProductData>;
    ownedController: IProductsCoreController<Product>;
    gameDetailsController: IProductsCoreController<GameDetails>;
    wishlistController: ICollectionController<number>;
    productFilesController: IProductFilesController;

    dlcTag = "dlc";
    ownedTag = "owned";
    wishlistedTag = "wishlisted";
    validationSuccessTag = "valid";
    validationErrorTag = "check data";

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

    public getAllTags: IGetAllTagsDelegate =
    (): Array<string> => {
        let tags = [
            this.dlcTag, 
            this.ownedTag,
            this.wishlistedTag,
            this.validationErrorTag,
            this.validationSuccessTag];
        if (!this.gameDetailsController) return tags;

        this.gameDetailsController.getAll().forEach(gd => {
            gd.tags.forEach(tag => {
                if (tags.indexOf(tag.name) === -1) tags.push(tag.name);
            })
        });

        return tags;
    }

    public getTags: IGetTagsDelegate =
    (id: number): Array<string> => {

        let tags: Array<string> = new Array<string>();

        if (this.productsDataController) {
            let productData = this.productsDataController.getById(id);
            if (productData &&
                productData.requiredProducts &&
                productData.requiredProducts.length) {
                tags.push(this.dlcTag);
            }
        }

        if (this.ownedController &&
            this.ownedController.getById(id)) {
            tags.push(this.ownedTag);
        }

        if (this.productFilesController) {
            let productFilesValidated = this.productFilesController.validated(id);
            if (productFilesValidated === true) {
                tags.push(this.validationSuccessTag);
            } else if (productFilesValidated === false) {
                tags.push(this.validationErrorTag);
            }
        }

        if (this.wishlistController &&
            this.wishlistController.contains(id)) {
            tags.push(this.wishlistedTag);
        }

        if (this.gameDetailsController) {
            let gd = this.gameDetailsController.getById(id);
            if (gd && gd.tags && gd.tags.length) {
                for (let tt = 0; tt < gd.tags.length; tt++)
                    tags.push(gd.tags[tt].name.toLowerCase());
            }
        }

        return tags;
    }
}