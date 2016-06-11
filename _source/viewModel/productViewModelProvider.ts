import {ProductCore} from "../model/productCore";
import {IGetViewModelDelegate, IViewModelProvider} from "./viewModelProvider";
import {IProductsCoreController} from "../productsCoreController";

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

    public constructor(ownedController: IProductsCoreController) {
        super();
        this.ownedController = ownedController;
    }

    public getViewModel = function(data: ProductCore): ProductViewModel {
        if (data == null) return null;
        var productViewModel = new ProductViewModel();
        
        productViewModel.class = "";
        productViewModel.id = data.id;
        productViewModel.title = data.title;

        if (this.ownedController &&
            this.ownedController.getById(data.id)) 
            productViewModel.class += "owned";

        return productViewModel;
    }
}