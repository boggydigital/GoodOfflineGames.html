import {ITemplateController} from "../templateController";
import {IBindController} from "../bindController";
import {IViewModelProvider} from "../viewModels/viewModelProvider";

export interface IGetIdDelegate<T> {
    (item: T): number;
}

export interface ICreateDelegate<T> {
    (model: T, getIdDelegate: IGetIdDelegate<T>, templateId: string): string;
}

export interface IViewController<T> {
    create: ICreateDelegate<T>;
}

export class ViewController<Type, ViewModel> implements IViewController<Type> {

    templateController: ITemplateController;
    bindController: IBindController<ViewModel>;
    viewModelProvider: IViewModelProvider<ViewModel>;

    public constructor(
        viewModelProvider: IViewModelProvider<ViewModel>,
        templateController: ITemplateController,
        bindController: IBindController<ViewModel>) {
        this.viewModelProvider = viewModelProvider;
        this.templateController = templateController;
        this.bindController = bindController;
    }

    public create: ICreateDelegate<Type> =
    (model: Type, getIdDelegate: IGetIdDelegate<Type>, templateId: string): string => {
        let view = "";
        let template = this.templateController.getTemplate(templateId);
        let id = getIdDelegate(model);
        let viewModel = this.viewModelProvider.getViewModel(id);
        if (template === "") view = "(cannot find template)";
        view = this.bindController.bindTemplateToModel(template, viewModel);
        return view;
    }
}