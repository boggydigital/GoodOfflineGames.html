import {SearchViewModel} from "./viewModel/searchViewModel";
import {ISearchViewModelProvider} from "./viewModel/searchViewModelProvider";

export class SearchController<T> {

    searchViewModelProvider: ISearchViewModelProvider<T>;
    searchIndex: Array<SearchViewModel>;

    public constructor(searchViewModelProvider: ISearchViewModelProvider<T>) {
        this.searchViewModelProvider = searchViewModelProvider;
        this.searchIndex = new Array<SearchViewModel>();
    }
    
    public index = (items: Array<T>) => {
        for (let ii=0; ii<items.length; ii++) {
            this.searchIndex.push(this.searchViewModelProvider.getViewModel(items[ii]));           
        }
    }
    
    // public constructor(searchInput: HTMLInputElement) {
    //     searchInput.addEventListener("input", function(e) {
    //         console.log(searchInput.value);
    //     });
    // }
}