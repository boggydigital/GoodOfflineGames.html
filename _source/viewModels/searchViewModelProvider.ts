import {ProductCore} from "../models/productCore";
import {ProductViewModel} from "./productViewModelProvider";
import {IGetViewModelDelegate, IViewModelProvider} from "./viewModelProvider";

export class SearchViewModel {
    id: number;
    searchString: string;
}

export class ProductSearchViewModelProvider implements IViewModelProvider<SearchViewModel> {

    productViewModelProvider: IViewModelProvider<ProductViewModel>;

    public constructor(productViewModelProvider: IViewModelProvider<ProductViewModel>) {
        this.productViewModelProvider = productViewModelProvider;
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

        let searchViewModel = new SearchViewModel();
        searchViewModel.id = id;
        searchViewModel.searchString = searchParts.join(" ");
        return searchViewModel;
    }
}