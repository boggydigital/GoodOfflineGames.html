import {ProductCore} from "../model/productCore";
import {IGetViewModelDelegate, IViewModelProvider} from "./viewModelProvider";

export class ProductViewModel {
    id: number;
    class: string;
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
    public getViewModel = function(data: ProductCore): ProductViewModel {
        if (data == null) return null;
        var productViewModel = new ProductViewModel();
        productViewModel.id = data.id;
        productViewModel.title = data.title;
        return productViewModel;
    }
}