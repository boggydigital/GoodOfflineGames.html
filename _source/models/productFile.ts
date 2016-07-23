import {ProductCore} from "./productCore";

export class ProductFile extends ProductCore {
    extra: boolean;
    file: string;
    folder: string;
    language: string;
    name: string;
    operatingSystem: string;
    size: string;
    validated: boolean;
    url: string;
    version: string;
}
