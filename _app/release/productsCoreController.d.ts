import { ProductCore } from "./model/productCore";
export interface IGetByIdDelegete {
    (id: number): ProductCore;
}
export interface IAddProductsDelegate {
    (products: Array<ProductCore>): void;
}
export interface IContainsDelegate {
    (id: number): boolean;
}
export interface IGetAllDelegate {
    (): Array<ProductCore>;
}
export interface IProductsCoreController {
    getById: IGetByIdDelegete;
    addProducts: IAddProductsDelegate;
    contains: IContainsDelegate;
    getAll: IGetAllDelegate;
}
export declare abstract class ProductsCoreController implements IProductsCoreController {
    model: Array<ProductCore>;
    constructor(products: Array<ProductCore>);
    getById: IGetByIdDelegete;
    contains: IContainsDelegate;
    addProducts: IAddProductsDelegate;
    getAll: IGetAllDelegate;
}
