import {ProductCore} from "./productCore";

export class NamedEntry {
    name: string;
}

export class Series {
    id: number;
    name: string;
    // products: any;
}

export class ProductData extends ProductCore {
    developer: NamedEntry;
    dlcs: Array<ProductData>;
    genres: Array<NamedEntry>;
    image: string;
    publisher: NamedEntry;
    requiredProducts: Array<ProductCore>;
    series: Series;
}