import { ProductCore } from "../model/productCore";
import { Product } from "../model/product";
import { GameDetails } from "../model/gameDetails";
import { IGetViewModelDelegate, IViewModelProvider } from "./viewModelProvider";
import { IProductsCoreController } from "../productsController";
import { ICollectionController } from "../collectionController";
export declare class ProductViewModel {
    id: number;
    class: string;
    tags: string;
    title: string;
}
export interface IGetProductViewModelDelegate<Input> extends IGetViewModelDelegate<Input, ProductViewModel> {
}
export interface IProductViewModelProvider<Input> extends IViewModelProvider<Input, ProductViewModel> {
    getViewModel: IGetProductViewModelDelegate<Input>;
}
export declare abstract class ProductViewModelProvider<Input> implements IProductViewModelProvider<Input> {
    getViewModel: (data: Input) => ProductViewModel;
}
export declare class ProductCoreViewModelProvider extends ProductViewModelProvider<ProductCore> {
    ownedController: IProductsCoreController<Product>;
    gameDetailsController: IProductsCoreController<GameDetails>;
    wishlistController: ICollectionController<number>;
    constructor(gameDetailsController: IProductsCoreController<GameDetails>, ownedController: IProductsCoreController<Product>, wishlistController: ICollectionController<number>);
    getViewModel: (data: ProductCore) => ProductViewModel;
}
