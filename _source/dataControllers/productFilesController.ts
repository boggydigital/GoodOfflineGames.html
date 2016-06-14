export class ProductFile {
    extra: boolean;
    file: string;
    folder: string;
    id: number;
    language: string;
    name: string;
    operatingSystem: string;
    // resolvedUrl: string;
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

export class ProductFilesController implements IProductFilesController {
    productFiles: Array<ProductFile>;

    public constructor(productFiles: Array<ProductFile>) {
        this.productFiles = productFiles;
    }

    public getProductFiles: IGetProductFilesDelegate =
    function (id: number): Array<ProductFile> {
        let foundProductFiles = [];
        for (let ii = 0; ii < this.productFiles.length; ii++) {
            if (this.productFiles[ii].id === id)
                foundProductFiles.push(this.productFiles[ii]);
        }
        return foundProductFiles;
    }

    public validated: IValidatedDelegate =
    function (id: number): boolean {
        let productFilesForId = this.getProductFiles(id);
        
        if (productFilesForId && productFilesForId.length === 0) 
            return undefined;

        let validity = true;
        for (var ii = 0; ii < productFilesForId.length; ii++)
            validity = validity && productFilesForId[ii].validated;
        return validity;
    }
}