import { ProductCore } from "../model/productCore";
export declare class SearchViewModel {
    id: number;
    searchString: string;
}
export interface IGetViewModelDelegate<Input, Output> {
    (data: Input): Output;
}
export interface IViewModelProvider<Input, Output> {
    getViewModel: IGetViewModelDelegate<Input, Output>;
}
export interface IGetSearchViewModelDelegate<Input> extends IGetViewModelDelegate<Input, SearchViewModel> {
}
export interface ISearchViewModelProvider<Input> extends IViewModelProvider<Input, SearchViewModel> {
    getViewModel: IGetSearchViewModelDelegate<Input>;
}
export declare abstract class SeachViewModelProvider<Input> implements ISearchViewModelProvider<Input> {
    getViewModel: (data: Input) => SearchViewModel;
}
export declare class ProductCoreSearchViewModelProvider extends SeachViewModelProvider<ProductCore> {
    getViewModel: (data: ProductCore) => SearchViewModel;
}
