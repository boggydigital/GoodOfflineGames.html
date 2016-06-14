import { ProductCore } from "../models/productCore";
import { Product } from "../models/product";
import { GameDetails } from "../models/gameDetails";
import { IGetViewModelDelegate, IViewModelProvider } from "./viewModelProvider";
import { IProductsCoreController } from "../dataControllers/productsController";
import { ICollectionController } from "../dataControllers/collectionController";
import { IProductFilesController } from "../dataControllers/productFilesController";
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
    productFilesController: IProductFilesController;
    constructor(gameDetailsController: IProductsCoreController<GameDetails>, ownedController: IProductsCoreController<Product>, wishlistController: ICollectionController<number>, productFilesController: IProductFilesController);
    getViewModel: IGetViewModelDelegate<ProductCore, ProductViewModel>;
}
