import { ITemplateController } from "./templateController";
import { IBindController } from "./bindController";
export interface ICreateDelegate {
    (model: any, templateId: string): string;
}
export interface IViewController {
    create: ICreateDelegate;
}
export declare class ViewController implements IViewController {
    templateController: ITemplateController;
    bindController: IBindController;
    constructor(templateController: ITemplateController, bindController: IBindController);
    create: ICreateDelegate;
}
