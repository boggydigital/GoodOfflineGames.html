import {ProductCore} from "./model/productCore";

export interface IGetByIdDelegete {
    (id: number): ProductCore
}

export interface IAddProductsDelegate {
    (products: Array<ProductCore>): void
}

export interface IContainsDelegate {
    (id: number): boolean;
}

export interface IGetAllDelegate {
    (): Array<ProductCore>
}

export interface IProductsCoreController {
    getById: IGetByIdDelegete;
    addProducts: IAddProductsDelegate;
    contains: IContainsDelegate;
    getAll: IGetAllDelegate;
}

export class ProductsCoreController implements IProductsCoreController {

    model: Array<ProductCore>;

    public constructor(products: Array<ProductCore>) {
        this.model = products;
    }

    public getById: IGetByIdDelegete = function (id: number): ProductCore {
        for (var ii = 0; ii < this.model.length; ii++) {
            if (this.model[ii].id === id) return this.model[ii];
        }
        return undefined;
    }
    
    public contains: IContainsDelegate = function(id: number): boolean {
        return this.getById(id) !== undefined;
    }

    public addProducts: IAddProductsDelegate = (products: Array<ProductCore>): void => {
        for (var ii = 0; ii < products.length; ii++) {
            if (this.getById(products[ii].id) === undefined) this.model.push(products[ii]);
        }
    }
    
    public getAll: IGetAllDelegate = function(): Array<ProductCore> {
        return this.model;
    }
}