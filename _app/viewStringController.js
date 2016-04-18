"use strict";
var ViewStringController = (function () {
    function ViewStringController(templateController, bindController) {
        var _this = this;
        this.createViewString = function (model, templateId) {
            var view = "";
            var template = _this.templateController.getTemplate(templateId);
            if (template === "")
                view = "(cannot find template)";
            view = _this.bindController.bindTemplateToModel(template, model);
            return view;
        };
        this.templateController = templateController;
        this.bindController = bindController;
    }
    return ViewStringController;
}());
exports.ViewStringController = ViewStringController;
//# sourceMappingURL=viewStringController.js.map