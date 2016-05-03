import { ProductCore } from "../model/productCore";
import { SearchViewModel } from "./searchViewModel";
import { SeachViewModelProvider } from "./searchViewModelProvider";
export declare class ProductCoreSearchViewModelProvider extends SeachViewModelProvider<ProductCore> {
    getViewModel: (data: ProductCore) => SearchViewModel;
}
