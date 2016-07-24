import {ProductCore} from "../models/productCore";
import {Product} from "../models/product";
import {ProductData} from "../models/productData";
import {GameDetails} from "../models/gameDetails";
import {ProductFile} from "../models/productFile";
import {IContainsDelegate} from "./collectionController";

export interface IGetByIdDelegate<T> {
    (id: number): T
}

export interface IGetAllByIdDelegate<T> {
    (id: number): Array<T>
}

export interface IAddProductsDelegate<T> {
    (products: Array<T>): void
}

export interface IGetAllDelegate<T> {
    (): Array<T>
}

export interface IProductsCoreController<T> {
    getById: IGetByIdDelegate<T>;
    getAllById: IGetAllByIdDelegate<T>;
    addProducts: IAddProductsDelegate<T>;
    contains: IContainsDelegate<T>;
    getAll: IGetAllDelegate<T>;
}

export abstract class ProductsCoreController<T> implements IProductsCoreController<ProductCore>  {

    model: Array<ProductCore>;

    public constructor(products: Array<ProductCore>) {
        this.model = products;
    }

    public getById: IGetByIdDelegate<ProductCore> =
    (id: number): ProductCore => {
        if (!this.model) return null;
        for (var ii = 0; ii < this.model.length; ii++) {
            if (this.model[ii].id === id) return this.model[ii];
        }
        return undefined;
    }

    public getAllById: IGetAllByIdDelegate<ProductCore> =
    (id: number): Array<ProductCore> => {
        let products = new Array<ProductCore>();
        if (!this.model) return products;
        for (var ii = 0; ii < this.model.length; ii++) {
            if (this.model[ii].id === id) products.push(this.model[ii]);
        }
        return products;
    }

    public contains: IContainsDelegate<ProductCore> =
    (id: number): boolean => {
        return this.getById(id) !== undefined;
    }

    public addProducts: IAddProductsDelegate<ProductCore> =
    (products: Array<ProductCore>): void => {
        if (!products) return;
        for (var ii = 0; ii < products.length; ii++) {
            if (this.getById(products[ii].id) === undefined) this.model.push(products[ii]);
        }
    }

    public getAll: IGetAllDelegate<ProductCore> =
    (): Array<ProductCore> => {
        return this.model;
    }
}

export class ProductsController extends ProductsCoreController<Product> {
    public constructor(products: Array<Product>) {
        super(products);
    }
}

export class ProductsDataController extends ProductsCoreController<ProductData> {
    public constructor(productsData: Array<ProductData>) {
        super(productsData);
    }
}

export class GameDetailsController extends ProductsCoreController<GameDetails> {
    public constructor(gameDetails: Array<GameDetails>) {
        super(gameDetails);
    }
}

export interface IValidatedDelegate {
    (id: number): boolean;
}

export interface IProductFilesController {
    validated: IValidatedDelegate;
}

export class ProductFilesController extends ProductsCoreController<ProductFile> implements IProductFilesController {
    
    public constructor(productFiles: Array<ProductFile>) {
        super(productFiles);
    }

    public validated: IValidatedDelegate =
    function (id: number): boolean {
        let productFilesForId = this.getAllById(id);

        if (productFilesForId && productFilesForId.length === 0)
            return undefined;

        let validity = true;
        for (var ii = 0; ii < productFilesForId.length; ii++)
            validity = validity && productFilesForId[ii].validated;
        return validity;
    }
}
