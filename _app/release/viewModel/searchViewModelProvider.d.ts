import { ProductCore } from "../model/productCore";
import { IGetViewModelDelegate, IViewModelProvider } from "./viewModelProvider";
export declare class SearchViewModel {
    id: number;
    searchString: string;
}
export interface IGetSearchViewModelDelegate<Input> extends IGetViewModelDelegate<Input, SearchViewModel> {
}
export interface ISearchViewModelProvider<Input> extends IViewModelProvider<Input, SearchViewModel> {
    getViewModel: IGetSearchViewModelDelegate<Input>;
}
export declare abstract class SearchViewModelProvider<Input> implements ISearchViewModelProvider<Input> {
    getViewModel: (data: Input) => SearchViewModel;
}
export declare class ProductCoreSearchViewModelProvider extends SearchViewModelProvider<ProductCore> {
    getViewModel: (data: ProductCore) => SearchViewModel;
}
