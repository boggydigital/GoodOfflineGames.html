import {SearchViewModel} from "./searchViewModel";
import {IGetViewModelDelegate, IViewModelProvider} from "./viewModelProvider";

export interface IGetSearchViewModelDelegate<Input> extends IGetViewModelDelegate<Input, SearchViewModel> {
    // ...
}

export interface ISearchViewModelProvider<Input> extends IViewModelProvider<Input, SearchViewModel> {
    getViewModel: IGetSearchViewModelDelegate<Input>;
}

export abstract class SeachViewModelProvider<Input> implements ISearchViewModelProvider<Input> {
    public getViewModel = (data: Input): SearchViewModel => {
        return null;
    }
}