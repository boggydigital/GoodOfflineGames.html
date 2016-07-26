import {ProductCore} from "../models/productCore";
import {ProductData} from "../models/productData";
import {Product} from "../models/product";
import {IProductsCoreController} from "../dataControllers/productsController";
import {ITagsController} from "../dataControllers/tagsController";
import {IGetViewModelByIdDelegate, IViewModelByIdProvider} from "./viewModelProvider";

export class IndexViewModel {
    id: number;
    terms: Array<string>;
}

export class FilterViewModelProvider implements IViewModelByIdProvider<IndexViewModel> {

    tagsController: ITagsController;

    public constructor(tagsController: ITagsController) {
        this.tagsController = tagsController;
    }

    public getViewModelById: IGetViewModelByIdDelegate<IndexViewModel> = 
    (id: number): IndexViewModel => {

        if (id == null) return null;

        let filterViewModel = new IndexViewModel();
        filterViewModel.id = id;

        if (this.tagsController) 
            filterViewModel.terms = this.tagsController.getTags(id);

        return filterViewModel;
    }
}

export class SearchViewModelProvider implements IViewModelByIdProvider<IndexViewModel> {

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

    public getViewModelById: IGetViewModelByIdDelegate<IndexViewModel> = 
    (id: number): IndexViewModel => {
        if (id == null) return null;

        let searchTerms = [];

        let product = this.productsController.getById(id) as Product;
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

        ["Windows", "Mac", "Linux"].forEach(os => { if (product.worksOn[os]) searchTerms.push(os.toLocaleLowerCase()) });

        let searchViewModel = new IndexViewModel();
        searchViewModel.id = id;
        searchViewModel.terms = searchTerms;

        return searchViewModel;
    }
}