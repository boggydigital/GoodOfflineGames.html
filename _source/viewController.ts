import {ITemplateController} from "./templateController";
import {IBindController} from "./bindController"; 
import {IViewModelProvider} from "./viewModel/viewModelProvider";

export interface ICreateDelegate {
    (model: any, templateId: string): string;
}

export interface IViewController {
    create: ICreateDelegate;
}

export class ViewController<Type, ViewModel> implements IViewController {

    templateController: ITemplateController;
    bindController: IBindController<ViewModel>;
    viewModelProvider: IViewModelProvider<Type, ViewModel>;

    public constructor(
        viewModelProvider: IViewModelProvider<Type, ViewModel>,
        templateController: ITemplateController,
        bindController: IBindController<ViewModel>) {
        this.viewModelProvider = viewModelProvider;
        this.templateController = templateController;
        this.bindController = bindController;
    }

    public create: ICreateDelegate = (model: Type, templateId: string): string => {
        let view = "";
        let template = this.templateController.getTemplate(templateId);
        let viewModel = this.viewModelProvider.getViewModel(model);
        if (template === "") view = "(cannot find template)";
        view = this.bindController.bindTemplateToModel(template, viewModel);
        return view;
    }
}