export interface IGetTemplateDelegate {
    (string): string;
}

export interface IGetKnownTemplatesDelegate {
    (): Array<string>;
}

export interface IResolveReferencesDelegate {
    (string): string;
}

export interface ITemplateController {
    getTemplate: IGetTemplateDelegate;
    getKnownTemplates: IGetKnownTemplatesDelegate;
    resolveReferences: IResolveReferencesDelegate;
}

export class TemplateController implements ITemplateController {

    templatesContainer: Element;

    public constructor() {
        this.templatesContainer = document.getElementById("templates");
    }

    public getKnownTemplates = function(): Array<string> {
        var knownTemplates = new Array<string>();
        var templates = document.querySelectorAll("template");
        for (var ii = 0; ii < templates.length; ii++) {
            var t = templates[ii];
            if (t && t.id) knownTemplates.push(t.id);
        }
        return knownTemplates;
    }

    public resolveReferences = (template: string): string => {
        let knownTemplates = this.getKnownTemplates();
        knownTemplates.forEach(knownTemplate => {
            let replacedTemplate = "[[" + knownTemplate + "]]";
            while (template.indexOf(replacedTemplate) > -1)
                template = template.replace(replacedTemplate, knownTemplate);
        });
        return template;
    }

    public getTemplate = (id: string): string => {
        var template = this.templatesContainer.querySelector("#" + id);
        var templateContent = template ? template.innerHTML : "";
        return this.resolveReferences(templateContent);
    }
}