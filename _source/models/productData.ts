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
    // dlcs: any;
    genres: Array<NamedEntry>;
    image: string;
    publisher: NamedEntry;
    // requiredProducts: any;
    series: Series;
}