export interface IBindTemplateToModelDelegate {
    (template: string, model: any): string;
}

export interface IBindController {
    bindTemplateToModel: IBindTemplateToModelDelegate;
}

export class BindController implements IBindController {

    bindDecorationOpen: string = "{{";
    bindDecorationClose: string = "}}";

    public bindTemplateToModel: IBindTemplateToModelDelegate = function (template: string, model: any): string {
        let result = template;
        for (var property in model) {
            var replacedProperty = this.bindDecorationOpen + property + this.bindDecorationClose;
            while (result.indexOf(replacedProperty) > -1)
                result = result.replace(replacedProperty, model[property]);
        }
        return result;
    }
}