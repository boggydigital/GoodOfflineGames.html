import { ProductCore } from "./model/productCore";
import { Product } from "./model/product";
import { GameDetails } from "./model/gameDetails";
import { IContainsDelegate } from "./collectionController";
export interface IGetByIdDelegate<T> {
    (id: number): T;
}
export interface IAddProductsDelegate<T> {
    (products: Array<T>): void;
}
export interface IGetAllDelegate<T> {
    (): Array<T>;
}
export interface IProductsCoreController<T> {
    getById: IGetByIdDelegate<T>;
    addProducts: IAddProductsDelegate<T>;
    contains: IContainsDelegate<T>;
    getAll: IGetAllDelegate<T>;
}
export declare abstract class ProductsCoreController<T> implements IProductsCoreController<ProductCore> {
    model: Array<ProductCore>;
    constructor(products: Array<ProductCore>);
    getById: IGetByIdDelegate<ProductCore>;
    contains: IContainsDelegate<ProductCore>;
    addProducts: IAddProductsDelegate<ProductCore>;
    getAll: IGetAllDelegate<ProductCore>;
}
export declare class ProductsController extends ProductsCoreController<Product> {
    constructor(products: Array<Product>);
}
export declare class GameDetailsController extends ProductsCoreController<GameDetails> {
    constructor(gameDetails: Array<GameDetails>);
}
