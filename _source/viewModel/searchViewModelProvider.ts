import {ProductCore} from "../model/productCore";
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
    public getViewModel = function(data: ProductCore): SearchViewModel {
        if (data == null) return null;
        var searchViewModel = new SearchViewModel();
        searchViewModel.id = data.id;
        searchViewModel.searchString = data.title.toLocaleLowerCase();
        return searchViewModel;
    }
}