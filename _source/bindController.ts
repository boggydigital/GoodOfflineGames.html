export interface IBindTemplateToModelDelegate<ViewModel> {
    (template: string, viewModel: ViewModel): string;
}

export interface IBindController<ViewModel> {
    bindTemplateToModel: IBindTemplateToModelDelegate<ViewModel>;
}

export class BindController<ViewModel> implements IBindController<ViewModel> {

    bindDecorationOpen: string = "{{";
    bindDecorationClose: string = "}}";

    public bindTemplateToModel: IBindTemplateToModelDelegate<ViewModel> = 
        (template: string, viewModel: ViewModel): string => {
        let result = template;
        for (var property in viewModel) {
            var replacedProperty = this.bindDecorationOpen + property + this.bindDecorationClose;
            while (result.indexOf(replacedProperty) > -1)
                result = result.replace(replacedProperty, viewModel[property]);
        }
        return result;
    }
}