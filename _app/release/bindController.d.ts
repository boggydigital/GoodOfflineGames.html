export interface IBindTemplateToModelDelegate<ViewModel> {
    (template: string, viewModel: ViewModel): string;
}
export interface IBindController<ViewModel> {
    bindTemplateToModel: IBindTemplateToModelDelegate<ViewModel>;
}
export declare class BindController<ViewModel> implements IBindController<ViewModel> {
    bindDecorationOpen: string;
    bindDecorationClose: string;
    bindTemplateToModel: IBindTemplateToModelDelegate<ViewModel>;
}
