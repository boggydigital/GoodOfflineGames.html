import {ProductCore} from "../models/productCore";
import {ProductData} from "../models/productData";
import {IProductsCoreController} from "../dataControllers/productsController";
import {ITagsController} from "../dataControllers/tagsController";
import {IGetViewModelDelegate, IViewModelProvider} from "./viewModelProvider";

export class SearchViewModel {
    id: number;
    searchTerms: Array<string>;
}

export class SearchViewModelProvider implements IViewModelProvider<SearchViewModel> {

    productsController: IProductsCoreController<ProductCore>;
    tagsController: ITagsController;
    productsDataController: IProductsCoreController<ProductData>;

    public constructor(productsController: IProductsCoreController<ProductCore>,
        tagsController: ITagsController,
        productsDataController: IProductsCoreController<ProductData>) {
        this.productsController = productsController;
        this.tagsController = tagsController;
        this.productsDataController = productsDataController;
    }

    public getViewModel = function (id: number): SearchViewModel {
        if (id == null) return null;

        let searchTerms = [];

        let product = this.productsController.getById(id);
        if (!product) return null;

        searchTerms.push(product.title.toLocaleLowerCase());
        searchTerms.push(product.id.toString());

        if (this.tagsController) {
            let tags = this.tagsController.getTags(id);
            tags.forEach(t => {
                searchTerms.push(t.toLocaleLowerCase());
            });
        }

        if (this.productsDataController) {
            let productData = this.productsDataController.getById(id);
            if (productData) {
                if (productData.developer) searchTerms.push(productData.developer.name.toLocaleLowerCase());
                if (productData.publisher) searchTerms.push(productData.publisher.name.toLocaleLowerCase());
                if (productData.genres) productData.genres.forEach(g => { searchTerms.push(g.name.toLocaleLowerCase()) });
            }
        }

        let searchViewModel = new SearchViewModel();
        searchViewModel.id = id;
        searchViewModel.searchTerms = searchTerms;

        return searchViewModel;
    }
}