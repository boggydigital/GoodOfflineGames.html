"use strict";
var BindController = (function () {
    function BindController() {
        var _this = this;
        this.bindDecorationOpen = "{{";
        this.bindDecorationClose = "}}";
        this.bindTemplateToModel = function (template, model) {
            var result = template;
            for (var property in model) {
                var replacedProperty = _this.bindDecorationOpen + property + _this.bindDecorationClose;
                while (result.indexOf(replacedProperty) > -1)
                    result = result.replace(replacedProperty, model[property]);
            }
            return result;
        };
    }
    return BindController;
}());
exports.BindController = BindController;
//# sourceMappingURL=bindController.js.map