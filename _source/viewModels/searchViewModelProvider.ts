import {ProductCore} from "../models/productCore";
import {ProductData} from "../models/productData";
import {ProductViewModel} from "./productViewModelProvider";
import {IProductsCoreController} from "../dataControllers/productsController";

import {IGetViewModelDelegate, IViewModelProvider} from "./viewModelProvider";

export class SearchViewModel {
    id: number;
    searchString: string;
}

export class ProductSearchViewModelProvider implements IViewModelProvider<SearchViewModel> {

    productViewModelProvider: IViewModelProvider<ProductViewModel>;
    productsDataController: IProductsCoreController<ProductData>;

    public constructor(productViewModelProvider: IViewModelProvider<ProductViewModel>,
        productsDataController: IProductsCoreController<ProductData>) {
        this.productViewModelProvider = productViewModelProvider;
        this.productsDataController = productsDataController;
    }

    public getViewModel = function (id: number): SearchViewModel {
        if (id == null) return null;

        let searchParts = [];

        if (this.productViewModelProvider) {
            let productViewModel = this.productViewModelProvider.getViewModel(id);
            searchParts.push(productViewModel.title.toLocaleLowerCase());
            searchParts.push(productViewModel.id);
            searchParts.push(productViewModel.tags.toLocaleLowerCase());
        }

        if (this.productsDataController) {
            let productData = this.productsDataController.getById(id);
            if (productData && productData.developer) searchParts.push(productData.developer.name.toLocaleLowerCase());
            if (productData && productData.publisher) searchParts.push(productData.publisher.name.toLocaleLowerCase());
        }

        let searchViewModel = new SearchViewModel();
        searchViewModel.id = id;
        searchViewModel.searchString = searchParts.join(" ");
        return searchViewModel;
    }
}