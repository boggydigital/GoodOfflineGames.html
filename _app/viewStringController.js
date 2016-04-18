"use strict";
var ViewStringController = (function () {
    function ViewStringController(templateController, bindController) {
        this.createViewString = function (model, templateId) {
            var view = "";
            var template = this.templateController.getTemplate(templateId);
            if (template === "")
                view = "(cannot find template)";
            view = this.bindController.bindTemplateToModel(template, model);
            return view;
        };
        this.templateController = templateController;
        this.bindController = bindController;
    }
    return ViewStringController;
}());
exports.ViewStringController = ViewStringController;
//# sourceMappingURL=viewStringController.js.map