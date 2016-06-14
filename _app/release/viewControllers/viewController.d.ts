import { ITemplateController } from "../templateController";
import { IBindController } from "../bindController";
import { IViewModelProvider } from "../viewModels/viewModelProvider";
export interface ICreateDelegate {
    (model: any, templateId: string): string;
}
export interface IViewController {
    create: ICreateDelegate;
}
export declare class ViewController<Type, ViewModel> implements IViewController {
    templateController: ITemplateController;
    bindController: IBindController<ViewModel>;
    viewModelProvider: IViewModelProvider<Type, ViewModel>;
    constructor(viewModelProvider: IViewModelProvider<Type, ViewModel>, templateController: ITemplateController, bindController: IBindController<ViewModel>);
    create: ICreateDelegate;
}
