import {ProductCore} from "../model/productCore";
import {IGetViewModelDelegate, IViewModelProvider} from "./viewModelProvider";
import {IProductsCoreController} from "../productsCoreController";
import {ICollectionController} from "../collectionController";

export class ProductViewModel {
    id: number;
    class: string;
    title: string;
    owned: boolean;
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

    ownedController: IProductsCoreController;
    wishlistController: ICollectionController<number>;

    public constructor(
        ownedController: IProductsCoreController,
        wishlistController: ICollectionController<number>) {
        super();
        this.ownedController = ownedController;
        this.wishlistController = wishlistController;
    }

    public getViewModel = function(data: ProductCore): ProductViewModel {
        if (data == null) return null;
        let productViewModel = new ProductViewModel();
        let classes = [];

        productViewModel.id = data.id;
        productViewModel.title = data.title;

        if (this.ownedController &&
            this.ownedController.getById(data.id)) 
            classes.push("owned");

        if (this.wishlistController &&
            this.wishlistController.check(data.id))
            classes.push("wishlisted");

        productViewModel.class = classes.join(" ");

        return productViewModel;
    }
}