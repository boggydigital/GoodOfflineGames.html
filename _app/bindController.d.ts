export interface IBindTemplateToModelDelegate {
    (template: string, model: any): string;
}
export interface IBindController {
    bindTemplateToModel: IBindTemplateToModelDelegate;
}
export declare class BindController implements IBindController {
    bindDecorationOpen: string;
    bindDecorationClose: string;
    bindTemplateToModel: IBindTemplateToModelDelegate;
}
