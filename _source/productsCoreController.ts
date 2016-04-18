import {ProductCore} from "./model/productCore";

export class ProductsCoreController {

    model: Array<ProductCore>;

    public constructor(products: Array<ProductCore>) {
        this.model = products;
    }

    public getById = function (id: number): ProductCore {
        for (var ii = 0; ii < this.model.length; ii++) {
            if (this.model[ii].id === id) return this.model[ii];
        }
        return undefined;
    }

    public addProducts = (products: Array<ProductCore>) => {
        for (var ii = 0; ii < products.length; ii++) {
            if (this.getById(products[ii].id) === undefined) this.model.push(products[ii]);
        }
    }
}