import {ITemplateController} from "../templateController";
import {IBindController} from "../bindController";
import {IViewModelByIdProvider} from "../viewModels/viewModelProvider";

export interface IGetIdDelegate {
    (item: any): number;
}

export interface ICreateByIdDelegate {
    (model: any, getIdDelegate: IGetIdDelegate, templateId: string): string;
}

export interface ICreateDelegate {
    (model: any, templateId: string): string;
}

export interface IViewController {
    createById: ICreateByIdDelegate;
}

export class ViewController<ViewModel> implements IViewController {

    templateController: ITemplateController;
    bindController: IBindController<ViewModel>;
    viewModelProvider: IViewModelByIdProvider<ViewModel>;

    public constructor(
        viewModelProvider: IViewModelByIdProvider<ViewModel>,
        templateController: ITemplateController,
        bindController: IBindController<ViewModel>) {
        this.viewModelProvider = viewModelProvider;
        this.templateController = templateController;
        this.bindController = bindController;
    }

    public createById: ICreateByIdDelegate =
    (model: any, getIdDelegate: IGetIdDelegate, templateId: string): string => {
        let view = "";
        let template = this.templateController.getTemplate(templateId);
        let id = getIdDelegate(model);
        let viewModel = this.viewModelProvider.getViewModelById(id);
        if (template === "") view = "(cannot find template)";
        view = this.bindController.bindTemplateToModel(template, viewModel);
        return view;
    }
}