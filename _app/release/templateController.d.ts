export interface IGetTemplateDelegate {
    (string: any): string;
}
export interface IGetKnownTemplatesDelegate {
    (): Array<string>;
}
export interface IResolveReferencesDelegate {
    (string: any): string;
}
export interface ITemplateController {
    getTemplate: IGetTemplateDelegate;
    getKnownTemplates: IGetKnownTemplatesDelegate;
    resolveReferences: IResolveReferencesDelegate;
}
export declare class TemplateController implements ITemplateController {
    templatesContainer: Element;
    constructor();
    getKnownTemplates: () => string[];
    resolveReferences: (template: string) => string;
    getTemplate: (id: string) => string;
}
