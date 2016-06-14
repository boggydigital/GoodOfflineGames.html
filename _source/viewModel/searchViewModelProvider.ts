import {ProductCore} from "../model/productCore";
import {IProductViewModelProvider, ProductViewModel} from "./productViewModelProvider";
import {IGetViewModelDelegate, IViewModelProvider} from "./viewModelProvider";

export class SearchViewModel {
    id: number;
    searchString: string;
}

export interface IGetSearchViewModelDelegate<Input> extends IGetViewModelDelegate<Input, SearchViewModel> {
    // ...
}

export interface ISearchViewModelProvider<Input> extends IViewModelProvider<Input, SearchViewModel> {
    getViewModel: IGetSearchViewModelDelegate<Input>;
}

export abstract class SearchViewModelProvider<Input> implements ISearchViewModelProvider<Input> {
    public getViewModel = (data: Input): SearchViewModel => {
        return null;
    }
}

export class ProductCoreSearchViewModelProvider extends SearchViewModelProvider<ProductCore> {

    productViewModelProvider: IProductViewModelProvider<ProductCore>;

    public constructor(productViewModelProvider: IProductViewModelProvider<ProductCore>) {
        super();
        this.productViewModelProvider = productViewModelProvider;
    }

    public getViewModel = function (data: ProductCore): SearchViewModel {
        if (data == null) return null;

        let searchParts = [];

        if (this.productViewModelProvider) {
            let productViewModel = this.productViewModelProvider.getViewModel(data);
            searchParts.push(productViewModel.title.toLocaleLowerCase());
            searchParts.push(productViewModel.id);
            searchParts.push(productViewModel.tags.toLocaleLowerCase());
        }

        let searchViewModel = new SearchViewModel();
        searchViewModel.id = data.id;
        searchViewModel.searchString = searchParts.join(" ");
        return searchViewModel;
    }
}