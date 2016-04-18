"use strict";
var TemplateController = (function () {
    function TemplateController(selectionController) {
        this.getKnownTemplates = function () {
            var knownTemplates = new Array();
            var templates = this.selectionController.getAll("template");
            for (var ii = 0; ii < templates.length; ii++) {
                var t = templates[ii];
                if (t && t.id)
                    knownTemplates.push(t.id);
            }
            return knownTemplates;
        };
        this.resolveReferences = function (template) {
            var knownTemplates = this.getKnownTemplates();
            knownTemplates.forEach(function (knownTemplate) {
                var replacedTemplate = "[[" + knownTemplate + "]]";
                while (template.indexOf(replacedTemplate) > -1)
                    template = template.replace(replacedTemplate, knownTemplate);
            });
            return template;
        };
        this.getTemplate = function (id) {
            var template = this.selectionController.getFromContainer(this.templatesContainer, "#" + id);
            var templateContent = template ? template.innerHTML : "";
            return this.resolveReferences(templateContent);
        };
        this.selectionController = selectionController;
        this.templatesContainer =
            this.selectionController &&
                this.selectionController.getById("templates");
    }
    return TemplateController;
}());
exports.TemplateController = TemplateController;
//# sourceMappingURL=templateController.js.map