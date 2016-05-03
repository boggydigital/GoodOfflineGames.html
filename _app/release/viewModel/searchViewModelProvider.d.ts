import { SearchViewModel } from "./searchViewModel";
import { IGetViewModelDelegate, IViewModelProvider } from "./viewModelProvider";
export interface IGetSearchViewModelDelegate<Input> extends IGetViewModelDelegate<Input, SearchViewModel> {
}
export interface ISearchViewModelProvider<Input> extends IViewModelProvider<Input, SearchViewModel> {
    getViewModel: IGetSearchViewModelDelegate<Input>;
}
export declare abstract class SeachViewModelProvider<Input> implements ISearchViewModelProvider<Input> {
    getViewModel: (data: Input) => SearchViewModel;
}
