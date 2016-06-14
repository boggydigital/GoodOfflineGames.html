import { ProductCore } from "./productCore";
export declare class WorksOn {
    Linux: boolean;
    Mac: boolean;
    Windows: boolean;
}
export declare class Product extends ProductCore {
    image: string;
    slug: string;
    url: string;
    worksOn: WorksOn;
}
