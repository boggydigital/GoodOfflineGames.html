import {ProductCore} from "./productCore";

export class WorksOn {
    Linux: boolean;
    Mac: boolean;
    Windows: boolean;
}

export class Product extends ProductCore{
    image: string;
    slug: string;
    url: string;
    worksOn: WorksOn;
}