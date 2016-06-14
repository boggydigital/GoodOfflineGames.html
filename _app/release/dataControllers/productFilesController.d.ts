export declare class ProductFile {
    extra: boolean;
    file: string;
    folder: string;
    id: number;
    language: string;
    name: string;
    operatingSystem: string;
    size: string;
    url: string;
    validated: boolean;
    version: string;
}
export interface IValidatedDelegate {
    (id: number): boolean;
}
export interface IGetProductFilesDelegate {
    (id: number): Array<ProductFile>;
}
export interface IProductFilesController {
    getProductFiles: IGetProductFilesDelegate;
    validated: IValidatedDelegate;
}
export declare class ProductFilesController implements IProductFilesController {
    productFiles: Array<ProductFile>;
    constructor(productFiles: Array<ProductFile>);
    getProductFiles: IGetProductFilesDelegate;
    validated: IValidatedDelegate;
}
