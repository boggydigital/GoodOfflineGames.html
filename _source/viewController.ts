import {ITemplateController} from "./templateController";
import {IBindController} from "./bindController"; 

export interface ICreateDelegate {
    (model: any, templateId: string): string;
}

export interface IViewController {
    create: ICreateDelegate;
}

export class ViewController implements IViewController {

    templateController: ITemplateController;
    bindController: IBindController;

    public constructor(templateController: ITemplateController,
        bindController: IBindController) {
        this.templateController = templateController;
        this.bindController = bindController;
    }

    public create: ICreateDelegate = (model: any, templateId: string): string => {
        let view = "";
        let template = this.templateController.getTemplate(templateId);
        if (template === "") view = "(cannot find template)";
        view = this.bindController.bindTemplateToModel(template, model);
        return view;
    }
}