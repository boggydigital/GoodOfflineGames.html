import {ProductCore} from "../model/productCore";
import {SearchViewModel} from "./searchViewModel";
import {SeachViewModelProvider} from "./searchViewModelProvider";

export class ProductCoreSearchViewModelProvider extends SeachViewModelProvider<ProductCore> {
    public getViewModel = function(data: ProductCore): SearchViewModel {
        if (data == null) return null;
        var searchViewModel = new SearchViewModel();
        searchViewModel.id = data.id;
        searchViewModel.searchString = data.title;
        return searchViewModel;
    }
}