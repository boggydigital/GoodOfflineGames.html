import {ProductCore} from "./model/productCore";
import {Product} from "./model/product";
import {GameDetails} from "./model/gameDetails";
import {IContainsDelegate} from "./collectionController";

export interface IGetByIdDelegate<T> {
    (id: number): T
}

export interface IAddProductsDelegate<T> {
    (products: Array<T>): void
}

export interface IGetAllDelegate<T> {
    (): Array<T>
}

export interface IProductsCoreController<T> {
    getById: IGetByIdDelegate<T>;
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
        function (id: number): ProductCore {
        for (var ii = 0; ii < this.model.length; ii++) {
            if (this.model[ii].id === id) return this.model[ii];
        }
        return undefined;
    }
    
    public contains: IContainsDelegate<ProductCore> = 
        function(id: number): boolean {
        return this.getById(id) !== undefined;
    }

    public addProducts: IAddProductsDelegate<ProductCore> = 
        (products: Array<ProductCore>): void => {
        for (var ii = 0; ii < products.length; ii++) {
            if (this.getById(products[ii].id) === undefined) this.model.push(products[ii]);
        }
    }
    
    public getAll: IGetAllDelegate<ProductCore> = 
        function(): Array<ProductCore> {
        return this.model;
    }
}

export class ProductsController extends ProductsCoreController<Product> {
    public constructor(products: Array<Product>) {
        super(products);
    }
}

export class GameDetailsController extends ProductsCoreController<GameDetails> {
    public constructor(gameDetails: Array<GameDetails>) {
        super(gameDetails);
    }
}
