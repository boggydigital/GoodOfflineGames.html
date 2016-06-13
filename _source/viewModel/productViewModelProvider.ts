import {ProductCore} from "../model/productCore";
import {Product} from "../model/product";
import {GameDetails} from "../model/gameDetails";
import {IGetViewModelDelegate, IViewModelProvider} from "./viewModelProvider";
import {IProductsCoreController} from "../productsController";
import {ICollectionController} from "../collectionController";

export class ProductViewModel {
    id: number;
    class: string;
    tags: string;
    title: string;
}

export interface IGetProductViewModelDelegate<Input> extends IGetViewModelDelegate<Input, ProductViewModel> {
    // ...
}

export interface IProductViewModelProvider<Input> extends IViewModelProvider<Input, ProductViewModel> {
    getViewModel: IGetProductViewModelDelegate<Input>;
}

export abstract class ProductViewModelProvider<Input> implements IProductViewModelProvider<Input> {
    public getViewModel = (data: Input): ProductViewModel => {
        return null;
    }
}

export class ProductCoreViewModelProvider extends ProductViewModelProvider<ProductCore> {

    ownedController: IProductsCoreController<Product>;
    gameDetailsController: IProductsCoreController<GameDetails>;
    wishlistController: ICollectionController<number>;

    public constructor(
        gameDetailsController: IProductsCoreController<GameDetails>,
        ownedController: IProductsCoreController<Product>,
        wishlistController: ICollectionController<number>) {
        super();
        this.gameDetailsController = gameDetailsController;
        this.ownedController = ownedController;
        this.wishlistController = wishlistController;
    }

    public getViewModel = function (data: ProductCore): ProductViewModel {
        if (data == null) return null;
        let productViewModel = new ProductViewModel();
        let classes = [];
        let tags = [];

        productViewModel.id = data.id;
        productViewModel.title = data.title;

        if (this.ownedController &&
            this.ownedController.getById(data.id)) {
            classes.push("owned");
            tags.push("OWN");
        }

        if (this.wishlistController &&
            this.wishlistController.contains(data.id)) {
            classes.push("wishlisted");
            tags.push("WISH");
        }

        if (this.gameDetailsController) {
            let gd = this.gameDetailsController.getById(data.id);
            if (gd && gd.tags && gd.tags.length) {
                for (let tt=0; tt<gd.tags.length; tt++) 
                    tags.push(gd.tags[tt].name);
            }
        }

        productViewModel.class = classes.join(" ");
        productViewModel.tags = tags.join(" ");

        return productViewModel;
    }
}