import { ProductCore } from "../model/productCore";
import { IGetViewModelDelegate, IViewModelProvider } from "./viewModelProvider";
import { IProductsCoreController } from "../productsCoreController";
export declare class ProductViewModel {
    id: number;
    class: string;
    title: string;
    owned: boolean;
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
    ownedController: IProductsCoreController;
    constructor(ownedController: IProductsCoreController);
    getViewModel: (data: ProductCore) => ProductViewModel;
}
