import {ProductCore} from "../models/productCore";
import {Product} from "../models/product";
import {ProductData} from "../models/productData";
import {GameDetails} from "../models/gameDetails";
import {IGetViewModelByIdDelegate, IViewModelByIdProvider} from "./viewModelProvider";
import {IProductsCoreController} from "../dataControllers/productsController";
import {ICollectionController} from "../dataControllers/collectionController";
import {IProductFilesController} from "../dataControllers/productsController";
import {ITagsController} from "../dataControllers/tagsController";

export class ProductViewModel {
    id: number;
    class: string;
    tags: Array<string>;
    title: string;
}

export class ProductViewModelProvider implements IViewModelByIdProvider<ProductViewModel> {

    productsController: IProductsCoreController<Product>;
    tagsController: ITagsController;

    public constructor(
        productsController: IProductsCoreController<Product>,
        tagsController: ITagsController) {
        this.productsController = productsController;
        this.tagsController = tagsController;
    }

    public getViewModelById: IGetViewModelByIdDelegate<ProductViewModel> =
    function (id: number): ProductViewModel {

        if (id == null) return null;

        let product = this.productsController.getById(id);
        if (!product) return null;

        let productViewModel = new ProductViewModel();
        let tags = this.tagsController.getTags(id);

        productViewModel.id = id;
        productViewModel.title = product.title;

        if (tags.length) {
            productViewModel.class = tags.join(" ") + " hasTags";
            productViewModel.tags = tags.join(". ");
        }

        return productViewModel;
    }
}